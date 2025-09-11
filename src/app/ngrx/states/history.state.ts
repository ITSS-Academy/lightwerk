export interface HistoryState {
  historyVideos: any[];
  canLoadMore: boolean;
  isLoading: boolean;
  isLoadSuccess: boolean;
  isLoadError: any;

  isDeleting: boolean;
  deleteSuccess: boolean;
  deleteError: any;
}
