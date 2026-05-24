import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { simpleLoaderInterceptor } from './core/interceptors/simple-loader.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideAnimations(),
  provideHttpClient(withInterceptors([simpleLoaderInterceptor, authInterceptor])),
  provideAnimationsAsync(),
  provideToastr({

    positionClass:
      'toast-top-right',

    preventDuplicates: true,

    timeOut: 3000

  })]
};

