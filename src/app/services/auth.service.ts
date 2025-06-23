import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

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

  logout() {
    localStorage.removeItem('jwt');
    this.tokenSubject.next(null);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }
}
