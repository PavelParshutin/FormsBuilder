import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { ActionTypes, RegistrationAction } from './auth.actions';
import { User } from './interfaces';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private store: Store, private auth: AuthService) {
  }
  //
  // onLogin$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ActionTypes.Registration),
  //     map((action: User) => action),
  //     switchMap((payload: User) =>
  //       this.auth.registaration(payload)
  //     )
  //   )
  // );

}
