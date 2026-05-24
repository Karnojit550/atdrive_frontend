import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api-service.service';
import { LoginRequest, RegisterRequest, AuthResponse, User, UserData } from '../models/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_DATA_KEY = 'userData';

  constructor(private api: ApiService, private router: Router) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('users/login', data).pipe(
      tap(response => this.saveAuthData(response))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    // Remove confirmPassword before sending to backend
    const { confirmPassword, ...registerData } = data as any;
    return this.api.post<AuthResponse>('users/create', registerData)
  }

  private saveAuthData(response: AuthResponse): void {
    console.log('Saving auth data:', response);
    const userData: UserData = {
      user: response.data.user,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(this.TOKEN_KEY, response.data.token);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    if (userData) {
      try {
        const parsed = JSON.parse(userData) as UserData;
        return parsed.user;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
  

  getUserData(): UserData | null {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    if (userData) {
      try {
        return JSON.parse(userData) as UserData;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    this.router.navigate(['/auth/login']);
  }

}
