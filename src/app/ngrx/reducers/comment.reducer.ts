import {createReducer, on} from '@ngrx/store';
import * as CommentActions from '../actions/comment.actions';
import {CommentState} from '../states/comment.state';

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  isLoadSuccess: false,
  isLoadError: null,

  isCreating: false,
  isCreateSuccess: false,
  isCreateError: null,
}

export const commentReducer = createReducer(
  initialState,

  on(CommentActions.createComment, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      isCreateError: null,
    }
  }),
  on(CommentActions.createCommentSuccess, (state, {type, comment}) => {
    console.log(type);
    return {
      ...state,
      comments: comment,
      isCreating: false,
      isCreateSuccess: true,
      isCreateError: null,
    }
  }),
  on(CommentActions.createCommentFailure, (state, {type, error}) => {
    console.log(type);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      isCreateError: error,
    }
  }),
  on(CommentActions.getAllComments, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isLoadSuccess: false,
      isLoadError: null,
    }
  }),
  on(CommentActions.getAllCommentsSuccess, (state, {type, comments}) => {
      console.log(type);
      return {
        ...state,
        comments: comments,
        isLoading: false,
        isLoadSuccess: true,
        isLoadError: null,
      }
    }
  ),
  on(CommentActions.getAllCommentsFailure, (state, {type, error}) => {
      console.log(type);
      return {
        ...state,
        isLoading: false,
        isLoadSuccess: false,
        isLoadError: error,
      }
    }
  ),
);
