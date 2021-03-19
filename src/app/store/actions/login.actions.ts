import {Action} from '@ngrx/store';
import {IError, IUser} from '../interfaces';

export enum ELoginTypes{
  Login = '[Login] Login',
  LoginSuccess = '[Login] LoginSuccess',
  LoginFailed = '[Login] LoginFailed',
}
export class Login implements Action{
  readonly type = ELoginTypes.Login
  constructor(public payload: IUser) {
  }
}
export class LoginSuccessAction implements Action{
  readonly type = ELoginTypes.LoginSuccess
  constructor(public payload: IUser) {
  }
}

export class LoginFailedAction implements Action{
  readonly type = ELoginTypes.LoginFailed
  constructor(public payload: IError) {
  }
}

export type LoginActions = LoginSuccessAction | LoginFailedAction | Login
