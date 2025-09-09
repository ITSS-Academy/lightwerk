import {CommentModel} from '../../models/comment.model';

export interface CommentState {
  comments: CommentModel[];
  isLoading: boolean;
  isLoadSuccess: boolean;
  isLoadError: any;

  isCreating: boolean;
  isCreateSuccess: boolean;
  isCreateError: any;
}
