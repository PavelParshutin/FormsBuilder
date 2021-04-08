import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import { registrationSuccessAction, registrationFailedAction, loginSuccessAction, loginFailedAction } from './auth.actions';
import {Response, Styles} from "./interfaces";

export const initialstate: Response =
  {
    token: null,
    error: null,
    isAuth: false
  }


export const authReducer = createReducer(
  initialstate,
  on(registrationSuccessAction, (state, prop) => ({
    ...state,
    token: prop,
    error: null,
    isAuth: true
})),
    on(registrationFailedAction, (state, props) => ({
    ...state,
      error: props,
      token: null,
      isAuth: false
})),
    on(loginSuccessAction, (state, props) => ({
    ...state,
      token: props,
      error: null,
      isAuth: true
})),
    on(loginFailedAction, (state, props) => ({
    ...state,
      error: props,
      token: null,
      isAuth: false
}))
)


export const defaultStylesFeatureSelector = createFeatureSelector<Response>('authReducer');

export const getToken = createSelector(defaultStylesFeatureSelector, state => state.token);
export const getIsAuth = createSelector(defaultStylesFeatureSelector, state => state.isAuth);
