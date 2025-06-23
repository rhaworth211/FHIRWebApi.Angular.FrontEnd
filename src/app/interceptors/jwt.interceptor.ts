import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * JwtInterceptor
 * 
 * This HTTP interceptor function automatically adds a Bearer token to the 
 * `Authorization` header of outgoing HTTP requests if a valid token exists.
 * 
 * Usage:
 * - Ensure `AuthService.getToken()` returns a valid JWT token string.
 * - Register this interceptor in your `provideHttpClient()` setup or in `app.config.ts`.
 */
export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }

  return next(req);
};
