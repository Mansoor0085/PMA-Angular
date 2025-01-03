import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient()]
};
