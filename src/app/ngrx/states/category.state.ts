export interface CategoryState {
  categories: { id: string; name: string }[];
  isLoading: boolean;
  isLoadSuccess: boolean;
  isLoadError: any;
}
