import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import * as profileActions from '../actions/profile.actions'
import {catchError, map, switchMap} from 'rxjs/operators';
import {exhaustMap, from, of} from 'rxjs';
import {ProfileModel} from '../../models/profile.model';
import {SearchService} from '../../services/search/search.service';
import * as SearchActions from '../actions/search.actions';

export const getUserVideosEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getUserVideos),
      switchMap((arg) => profileService.getUserVideo(arg.profileId, arg.page, arg.orderBy).pipe(
        map((res) => {
          console.log(res);
          return profileActions.getUserVideosSuccess({
            userVideos: res.videos,
            totalCount: res.totalCount,
          });
        }),
        catchError((error: { message: any }) =>
          of(profileActions.getUserVideosFailure({error}))
        ))
      )
    );
  },
  {functional: true}
)

export const editProfileEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.editProfileUser),
      switchMap((arg) => from(profileService.editProfileUser(arg.username, arg.bio, arg.avatarUrl)).pipe(
        map((res) => {
          console.log(res);
          return profileActions.editProfileUserSuccess({
            profile: {
              id: res.id,
              username: res.username,
              bio: res.bio,
              avatarPath: res.avatarPath,
            }
          });
        }),
        catchError((error: { message: any }) =>
          of(profileActions.editProfileUserFailure({error}))
        ))
      )
    );
  },
  {functional: true}
)


export const getProfileEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getProfile),
      switchMap(({userId}) =>
        from(profileService.getProfile(userId)).pipe(
          map((res) =>
            profileActions.getProfileSuccess({profile: res as ProfileModel}) // 👈 ép kiểu
          ),
          catchError((error) =>
            of(profileActions.getProfileFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getLikedVideosEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getLikedVideos),
      switchMap((arg) =>
        from(profileService.getLikedVideos(arg.profileId, arg.page, arg.orderBy)).pipe(
          map((res) => {
            console.log(res);
            return profileActions.getLikedVideosSuccess({
              likedVideos: res.videos,
              totalCount: res.totalCount,
            });
          }),
          catchError((error: { message: any }) =>
            of(profileActions.getLikedVideosFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
)

// Following List Effects
export const getFollowingEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getFollowing),
      switchMap((arg) =>
        from(profileService.getFollowing(arg.profileId)).pipe(
          map((following: ProfileModel[]) => {
            console.log(following);
            return profileActions.getFollowingSuccess({
              following,
              totalCount: following.length,
            });
          }),
          catchError((error: { message: any }) =>
            of(profileActions.getFollowingFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
)


// Followers List Effects
export const getFollowersEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getFollowers),
      switchMap((arg) =>
        from(profileService.getFollowers(arg.profileId)).pipe(
          map((followers: ProfileModel[]) => {
            console.log(followers);
            return profileActions.getFollowersSuccess({
              followers,
              totalCount: followers.length,
            });
          }),
          catchError((error: { message: any }) =>
            of(profileActions.getFollowersFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
)

export const followUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const searchService = inject(SearchService);
    return actions$.pipe(
      ofType(SearchActions.followUser),
      exhaustMap((action) =>
        searchService.toggleFollowUser(action.userId, action.shouldFollow).pipe(
          map((response) => SearchActions.followUserSuccess({
            isFollowing: response.isFollowing
          })),
          catchError((error: any) =>
            of(SearchActions.followUserFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);
