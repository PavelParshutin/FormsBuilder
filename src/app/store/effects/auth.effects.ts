import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {ELoginTypes, LoginActions} from '../actions/login.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {IUser} from '../interfaces';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {
  }
  onLogin$:any = createEffect(() => {
    return this.actions$.pipe(ofType(ELoginTypes.Login),
      tap(action => console.log('effects ', action)),
      map((action: any) => action.payload));
  })
}
