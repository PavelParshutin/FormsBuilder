import { createReducer, on } from '@ngrx/store';
import { registrationSuccessAction, registrationFailedAction } from './auth.actions';

export const initialstate = []

export const authReducer = createReducer(
  initialstate,
  on(registrationSuccessAction, state =>({
    ...state
})),
    on(registrationFailedAction, state =>({
    ...state,
      error: state
}))
)

