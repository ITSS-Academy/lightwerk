import {createReducer, on} from '@ngrx/store';
import {LikeVideoState} from '../states/like-video.state';
import * as LikeVideoActions from '../actions/like-video.actions';

const initialState: LikeVideoState = {
  count: 0,
  isLoading: false,
  isLoadSuccess: false,
  isLoadError: null,

  countAfterDelete: 1,
  isDeleting: false,
  isDeleteSuccess: false,
  isDeleteError: null,

  countAfterAdd: 0,
  isAdding: false,
  isAddSuccess: false,
  isAddError: null,


}

export const likeVideoReducer = createReducer(
  initialState,
  on(LikeVideoActions.getAllLikeVideos, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isLoadSuccess: false,
      isLoadError: null
    }
  }),
  on(LikeVideoActions.getAllLikeVideosSuccess, (state, {type, count}) => {
    console.log(type);
    return {
      ...state,
      count: count,
      isLoading: false,
      isLoadSuccess: true,
      isLoadError: null
    }
  }),
  on(LikeVideoActions.getAllLikeVideosFailure, (state, {type, error}) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isLoadSuccess: false,
      isLoadError: error
    }
  }),

  //delete like video
  on(LikeVideoActions.clearLikeVideoState, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isDeleting: true,
      isDeleteSuccess: false,
      isDeleteError: null
    }
  }),

  on(LikeVideoActions.clearLikeVideoStateSuccess, (state, {type, countAfterDelete}) => {
    console.log(type);
    return {
      ...state,
      countAfterDelete: countAfterDelete,
      isDeleting: false,
      isDeleteSuccess: true,
      isDeleteError: null
    }
  }),

  on(LikeVideoActions.clearLikeVideoStateFailure, (state, {type, error}) => {
      console.log(type);
      return {
        ...state,
        isDeleting: false,
        isDeleteSuccess: false,
        isDeleteError: error
      }
    }
  ),
  on(LikeVideoActions.createLikeVideoState, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isAdding: true,
      isAddSuccess: false,
      isAddError: null
    }
  }),
  on(LikeVideoActions.createLikeVideoStateSuccess, (state, {type, countAfterCreate}) => {
    console.log(type);
    return {
      ...state,
      countAfterAdd: countAfterCreate,
      isAdding: false,
      isAddSuccess: true,
      isAddError: null
    }
  }),
  on(LikeVideoActions.createLikeVideoStateFailure, (state, {type, error}) => {
      console.log(type);
      return {
        ...state,
        isAdding: false,
        isAddSuccess: false,
        isAddError: error
      }
    }
  ));
