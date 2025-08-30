import {createAction, props} from '@ngrx/store';

export const getAllCategories = createAction('[Category] Get All Categories');
export const getAllCategoriesSuccess = createAction('[Category] Get All Categories Success', props<{
  categories: { id: string; name: string }[]
}>());
export const getAllCategoriesFailure = createAction('[Category] Get All Categories Failure', props<{
  error: any
}>());
