import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import * as profileActions from '../actions/profile.actions'
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {ProfileModel} from '../../models/profile.model';

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
      switchMap((arg) => profileService.editProfileUser(arg.username, arg.bio, arg.avatarUrl).pipe(
        map((res) => {
          console.log(res);
          return profileActions.editProfileUserSuccess({
            profile: {
              id: res.id,
              username: res.username,
              bio: res.bio,
              avatarPath: res.avatarUrl,
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

//get following list

export const getFollowingListEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getFollowingList),
      switchMap((arg) => profileService.getFollowing(arg.userId).pipe(
        map((res) => {
          return profileActions.getFollowingListSuccess({followingList: res});
        }),
        catchError((error: { message: any }) =>
          of(profileActions.getFollowingListFailure({error}))
        ))
      )
    );
  },
  {functional: true}
)

//get followers list
export const getFollowersListEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getFollowersList),
      switchMap((arg) => profileService.getFollowers(arg.userId).pipe(
        map((res) => {
          return profileActions.getFollowersListSuccess({followersList: res});
        }),
        catchError((error: { message: any }) =>
          of(profileActions.getFollowersListFailure({error}))
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
