import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: string | null = null;

  constructor() {}

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  login(username: string) {
    this.isLoggedIn = true;
    this.currentUser = username;
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  }

  getCurrentUsername(): string | null {
    return this.currentUser;
}
}
