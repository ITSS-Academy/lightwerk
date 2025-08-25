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

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync(),
    provideStore(
      {
        auth: authReducer,
        video: videoReducer
      },
    ),
    provideEffects(AuthEffects, VideoEffects),
    provideHttpClient()]
};

