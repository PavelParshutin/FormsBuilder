import {userReducer, UserState} from './user';
import {ActionReducerMap} from '@ngrx/store';

import {styleReducer} from './defaultStyles.reduser';
import {Styles, Component} from './interfaces';

export interface  State{
  // user: UserState
  defaultComponentStyles: Styles
}

export const reducers: ActionReducerMap<State> = {
  // user: userReducer,
  defaultComponentStyles : styleReducer
}
