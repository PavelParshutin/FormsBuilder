import { ActionReducerMap } from '@ngrx/store';

import { styleReducer } from './component-styles.reduser';
import { Styles } from './interfaces';

export interface State {
  // user: UserState
  defaultComponentStyles: Styles
}

export const reducers: ActionReducerMap<State> = {
  // user: userReducer,
  defaultComponentStyles: styleReducer
};
