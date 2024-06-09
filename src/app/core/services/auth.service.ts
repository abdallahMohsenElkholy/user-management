import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Auth } from '../enums/user.enum';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
  // deps: [HttpClient, Router],
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private _http: HttpClient, private _router: Router) {
    const user = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject(
      user ? JSON.parse(user) : null
    );
  }

  apiUrl: string = environment.apiUrl;

  login(form: any) {
    return this._http.post<User>(`${this.apiUrl}${Auth.login}`, form).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return this.currentUserSubject;
      })
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this._router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  redirectToUserManagement() {
    this._router.navigateByUrl('/user-management');
  }
}
