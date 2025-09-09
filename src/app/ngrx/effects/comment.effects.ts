import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject,} from '@angular/core'
import * as CommentActions from '../actions/comment.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {CommentService} from '../../services/comment/comment.service';

//create comment

export const createComment = createEffect(
  (actions$: Actions = inject(Actions), commentService: CommentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.createComment),
      exhaustMap((action) =>
        commentService.createComment(action.content, action.videoId).pipe(
          map((res) => CommentActions.createCommentSuccess({comment: res})),
          catchError((error: any) =>
            of(CommentActions.createCommentFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)

//get all comments for a video

export const getAllComments = createEffect(
  (actions$: Actions = inject(Actions), commentService: CommentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.getAllComments),
      exhaustMap((action) =>
        commentService.getAllComments(action.videoId).pipe(
          map((res) => CommentActions.getAllCommentsSuccess({comments: res})),
          catchError((error: any) =>
            of(CommentActions.getAllCommentsFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)
