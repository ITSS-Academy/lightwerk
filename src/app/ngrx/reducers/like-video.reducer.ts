import {createReducer, on} from '@ngrx/store';
import {LikeVideoState} from '../states/like-video.state';
import * as LikeVideoActions from '../actions/like-video.actions';

const initialState: LikeVideoState = {


  isDeleting: false,
  isDeleteSuccess: false,
  isDeleteError: null,

  isAdding: false,
  isAddSuccess: false,
  isAddError: null,


}

export const likeVideoReducer = createReducer(
  initialState,

  //delete like video
  on(LikeVideoActions.deleteLikeVideo, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isDeleting: true,
      isDeleteSuccess: false,
      isDeleteError: null
    }
  }),

  on(LikeVideoActions.deleteLikeVideoSuccess, (state, {type,}) => {
    console.log(type);
    return {
      ...state,
      isDeleting: false,
      isDeleteSuccess: true,
      isDeleteError: null
    }
  }),

  on(LikeVideoActions.deleteLikeVideoFailure, (state, {type, error}) => {
      console.log(type);
      return {
        ...state,
        isDeleting: false,
        isDeleteSuccess: false,
        isDeleteError: error
      }
    }
  ),
  on(LikeVideoActions.createLikeVideo, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isAdding: true,
      isAddSuccess: false,
      isAddError: null
    }
  }),
  on(LikeVideoActions.createLikeVideoSuccess, (state, {type,}) => {
    console.log(type);
    return {
      ...state,
      isAdding: false,
      isAddSuccess: true,
      isAddError: null
    }
  }),
  on(LikeVideoActions.createLikeVideoFailure, (state, {type, error}) => {
      console.log(type);
      return {
        ...state,
        isAdding: false,
        isAddSuccess: false,
        isAddError: error
      }
    }
  ));
