import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import {
  loginAction,
  registrationAction,
  registrationFailedAction,
  registrationSuccessAction
} from './auth.actions';
import {AuthResponse, User, Error} from './interfaces';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private store: Store, private auth: AuthService) {
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
          map((accessToken: AuthResponse) => registrationSuccessAction(accessToken)),
          catchError((err: Error) => registrationFailedAction)
        )
    )
  ))
}
