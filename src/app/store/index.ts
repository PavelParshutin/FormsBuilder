import { ActionReducerMap } from '@ngrx/store';

import { styleReducer } from './component-styles.reduser';
import {Response, Styles} from './interfaces';
import {authReducer} from "./auth.reducer";


export interface State {
  defaultComponentStyles: Styles;
  authReducer: Response;
}

export const reducers: ActionReducerMap<State> = {
  defaultComponentStyles: styleReducer,
  authReducer: authReducer
};
