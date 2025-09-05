import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideHttpClient} from '@angular/common/http';
import {authReducer} from './ngrx/reducers/auth.reducer';
import * as AuthEffects from './ngrx/effects/auth.effects';
import {videoReducer} from './ngrx/reducers/video.reducer';
import * as VideoEffects from './ngrx/effects/video.effects';
import {categoryReducer} from './ngrx/reducers/category.reducer';
import * as CategoryEffects from './ngrx/effects/category.effects';
import {profileReducer} from './ngrx/reducers/profile.reducer';
import * as ProfileEffects from './ngrx/effects/profile.effects';
import {likeVideoReducer} from './ngrx/reducers/like-video.reducer';
import * as LikeVideoEffects from './ngrx/effects/like-video.effects';
import {playlistReducer} from './ngrx/reducers/playlist.reducer';
import * as PlayListEffects from './ngrx/effects/playlist.effect';
import {followingReducer} from './ngrx/reducers/following.reducer';
import * as FollowingEffects from './ngrx/effects/following.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync(),
    provideStore(
      {
        auth: authReducer,
        video: videoReducer,
        category: categoryReducer,
        likeVideo: likeVideoReducer,
        profile: profileReducer,
        following: followingReducer,
        playlist: playlistReducer
      },
    ),
    provideEffects(AuthEffects, VideoEffects, CategoryEffects, ProfileEffects, LikeVideoEffects, PlayListEffects, FollowingEffects),
    provideHttpClient()]
};

