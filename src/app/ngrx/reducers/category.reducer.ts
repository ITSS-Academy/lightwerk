import {CategoryState} from '../states/category.state';
import {createReducer, on} from '@ngrx/store';
import * as CategoryActions from '../actions/category.actions';

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  isLoadSuccess: false,
  isLoadError: null
}

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.getAllCategories, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isLoadSuccess: false,
      isLoadError: null
    }
  }),
  on(CategoryActions.getAllCategoriesSuccess, (state, {type, categories}) => {
    console.log(type);
    return {
      ...state,
      categories: categories,
      isLoading: false,
      isLoadSuccess: true,
      isLoadError: null
    }
  }),
  on(CategoryActions.getAllCategoriesFailure, (state, {type, error}) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isLoadSuccess: false,
      isLoadError: error
    }
  })
)
