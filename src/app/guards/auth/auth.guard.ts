// src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

/**
 * AuthGuard
 * 
 * A functional route guard that checks whether a user is authenticated
 * by verifying the presence of a JWT token from `AuthService`.
 * 
 * If a token exists, access to the route is granted (`true`).
 * If not, the user is redirected to the `/login` page.
 * 
 * Usage:
 * - Add this guard to route definitions in your `app.routes.ts` or equivalent routing module.
 * - Requires `AuthService.getToken()` to return a non-empty string for valid sessions.
 */

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();

  return token
    ? true
    : router.createUrlTree(['/login']); 
};
