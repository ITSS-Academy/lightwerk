import { HistoryState } from '../states/history.state';
import { createReducer, on } from '@ngrx/store';
import * as HistoryActions from '../actions/history.actions';

const initialState: HistoryState = {
  historyVideos: [],
  isLoading: false,
  isLoadSuccess: false,
  isLoadError: null,

  isDeleting: false,
  deleteSuccess: false,
  deleteError: undefined
};

export const historyReducer = createReducer(
  initialState,

  on(HistoryActions.getAllHistory, (state, { type }) => ({
    ...state,
    isLoading: true,
    isLoadSuccess: false,
    isLoadError: null
  })),
  on(HistoryActions.getAllHistorySuccess, (state, { history }) => ({
    ...state,
    historyVideos: history,
    isLoading: false,
    isLoadSuccess: true,
    isLoadError: null
  })),
  on(HistoryActions.getAllHistoryFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    isLoadSuccess: false,
    isLoadError: error
  })),

  // delete video
  on(HistoryActions.deleteHistoryVideo, (state) => ({
    ...state,
    isDeleting: true,
    deleteSuccess: false,
    deleteError: undefined
  })),
  on(HistoryActions.deleteHistoryVideoSuccess, (state, { videoId }) => ({
    ...state,
    isLoading: false,
    deleteSuccess: true,
  })),
  on(HistoryActions.deleteHistoryVideoFailure, (state, { error }) => ({
    ...state,
    isDeleting: false,
    deleteSuccess: false,
    deleteError: error
  }))
);
