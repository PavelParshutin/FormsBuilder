import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as jwtEncode from 'jwt-encode';

import { environment } from '../../environments/environment';
import { AuthResponse, User } from '../store/interfaces';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  isAuth = false

  logIn(newUser: User): Observable<AuthResponse>{
    return this.http.post(`${environment.baseUrl}/users`, newUser).pipe(
      map((user: User) => {
          const accessToken = this.createToken(user);
          return {accessToken};
        },
        catchError(err => err)
      ))
  }

  registration(newUser: User): Observable<AuthResponse>{
    return this.http.post(`${environment.baseUrl}/users`, newUser).pipe(
      map((user: User) => {
          this.isAuth = true
          const accessToken = this.createToken(user);
          return {accessToken};
        },
        catchError(
          err => {
            return err;
          }
        )
      ))
  }

  createToken(obj): string
  {
    return jwtEncode(obj, 'secretKey')
  }
}
