import {IError, IUser} from '../interfaces';
import {ELoginTypes, LoginActions} from '../actions/login.actions';

export interface State {
  user: IUser;
  error: IError;
}

const initiallState: State = {
  user: null,
  error: null
};
export function reducer(state: State = initiallState, action: LoginActions): State{
  switch (action.type){
    case ELoginTypes.LoginSuccess:
      return {
        ...state, user: action.payload, error: null
      };
    case ELoginTypes.LoginFailed:
      return {
        ...state, user: null, error: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
