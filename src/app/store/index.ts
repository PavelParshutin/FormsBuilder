import {userReducer, UserState} from './user';
import {ActionReducerMap} from '@ngrx/store';

export interface  State{
  user: UserState
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer
}
