import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import {
  loginAction,
  loginFailedAction,
  loginSuccessAction,
  registrationAction,
  registrationFailedAction,
  registrationSuccessAction
} from './auth.actions';
import { AuthResponse, User, Error } from './interfaces';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private auth: AuthService) {
  }

  onRegistration$ = createEffect( () =>
    this.actions$.pipe(
      ofType(registrationAction),
      switchMap((prop: User): Observable<any> => this.auth.registration(prop).pipe(
          map((accessToken: AuthResponse) => registrationSuccessAction(accessToken)),
          catchError((err: Error) => registrationFailedAction)
        )
    )
  ))

  onLogin$ = createEffect( () =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap((prop: User): Observable<any> => this.auth.logIn(prop).pipe(
          map((accessToken: AuthResponse) => loginSuccessAction(accessToken)),
          catchError((err: Error) => loginFailedAction)
        )
    )
  ))
}
