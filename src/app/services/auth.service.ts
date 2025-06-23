import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })

/**
 * AuthService
 *
 * Provides authentication logic including login, logout, and token access.
 * Manages JWT tokens using localStorage and exposes the current token as an observable.
 */
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Attempts to authenticate the user with the backend using the provided credentials.
   * On success, stores the received JWT in localStorage and updates the token observable.
   *
   * @param username The user's username.
   * @param password The user's password.
   * @returns An observable that emits the login response and performs side effects (e.g., token storage).
   */
  login(username: string, password: string) {
    return this.http.post<{ token: string }>('https://localhost:7091/api/auth/login', {
      username,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.token);
        this.tokenSubject.next(response.token);
      })
    );
  }
  
  /**
   * Logs the user out by removing the JWT from localStorage and clearing the token observable.
   */
  logout() {
    localStorage.removeItem('jwt');
    this.tokenSubject.next(null);
  }

  /**
   * Retrieves the current JWT from localStorage.
   * Used internally by interceptors and guards.
   *
   * @returns The JWT string or null if not set.
   */
  getToken() {
    return localStorage.getItem('jwt');
  }
}
