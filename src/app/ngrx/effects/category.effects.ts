import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';

;
import * as categoryActions from '../actions/category.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {CategoryService} from '../../services/category/category.service';

export const getAllCategories = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.getAllCategories),
      exhaustMap(() =>
        categoryService.getAllCategories().pipe(
          map((res) => categoryActions.getAllCategoriesSuccess({categories: res})),
          catchError((error: any) =>
            of(categoryActions.getAllCategoriesFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)
