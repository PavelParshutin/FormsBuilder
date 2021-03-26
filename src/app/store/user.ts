import {createAction, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

export const  login = createAction('[USER] Login');
export const  loginSuccess = createAction('[USER] LoginSuccess');
export const  loginFailed = createAction('[USER] LoginFailed');

export interface UserState{
  email: string
  password: number
}

export const initialState: UserState = {
  email: '',
  password: 0
}

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, state => ({
    ...state,
    email: '',
    password: 1
  })),
  on(loginFailed, state => ({
    ...state,
    email: '',
    password: 1
  }))
)

// export const featureSelector = createFeatureSelector<UserState>('user')
// export  const userSelector = createSelector(featureSelector, state => {
//     state.email
//     state.password
// })


