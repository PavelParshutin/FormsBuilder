import {ActionReducerMap} from '@ngrx/store';
import {reducer} from './reducers/auth.reducer';

export const reducers: ActionReducerMap<any> = {
  user: reducer
}

