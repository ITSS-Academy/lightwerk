export interface LikeVideoState {
  count: number;
  isLoading: boolean;
  isLoadSuccess: boolean;
  isLoadError: any;

  countAfterDelete: number;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
  isDeleteError: any;

  countAfterAdd: number;
  isAdding: boolean;
  isAddSuccess: boolean;
  isAddError: any;
}
