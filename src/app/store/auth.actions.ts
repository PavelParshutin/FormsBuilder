import { Action, createAction, props } from '@ngrx/store';

import { User } from './interfaces';

export const loginAction = createAction('[AUTH] Login', props<User>())
export const loginSuccessAction = createAction('[AUTH] Login Success')
export const loginFailedAction = createAction('[AUTH] Login Failed')

export const registrationAction = createAction('[AUTH] Login', props<User>())
export const registrationSuccessAction = createAction('[AUTH] Login Success')
export const registrationFailedAction = createAction('[AUTH] Login Failed')


export enum ActionTypes {
  Registration = '[App] Registration',
  RegistrationSuccess = '[App] Registration success',
  RegistrationFailed = '[App] Registration failed'
}

export class RegistrationAction implements Action {
  readonly type = ActionTypes.Registration;

  constructor(public payload: User) {}
}

export class RegistrationSuccessAction implements Action {
  readonly type = ActionTypes.RegistrationSuccess;

  constructor(public payload: User) {}
}

export class RegistrationFailedAction implements Action {
  readonly type = ActionTypes.RegistrationFailed;

  constructor(public payload: Error) {}
}

export type Actions = RegistrationAction | RegistrationSuccessAction | RegistrationFailedAction;
