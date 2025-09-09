import {createAction, props} from '@ngrx/store';
import {CommentModel} from '../../models/comment.model';

//create comment
export const createComment = createAction('[Comment] Create Comment', props<{
  content: string,
  videoId: string,
}
>());
export const createCommentSuccess = createAction('[Comment] Create Comment Success', props<{
  comment: CommentModel[]
}>());
export const createCommentFailure = createAction('[Comment] Create Comment Failure', props<{
  error: any
}>());
export const getAllComments = createAction('[Comment] Get All Comments', props<{
  videoId: string
}>());
export const getAllCommentsSuccess = createAction('[Comment] Get All Comments Success', props<{
  comments: CommentModel[]
}>());
export const getAllCommentsFailure = createAction('[Comment] Get All Comments Failure', props<{
  error: any
}>());
