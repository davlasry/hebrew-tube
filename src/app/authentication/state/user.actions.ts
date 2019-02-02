import { Action } from '@ngrx/store';

export const LOAD_USER = '[User] Load User';
export const LOAD_USER_SUCCESS = '[User] Load User Sucess';
export const LOAD_USER_FAILURE = '[User] Load User Failure';
export const USER_SIGN_OUT = '[User] User Sign Out';
export const USER_SIGN_OUT_SUCCESS = '[User] User Sign Out Success';
export const SIGN_UP = '[User] Sign Up';
export const SIGN_UP_SUCCESS = '[User] Sign Up Success';
export const LOGIN_REDIRECT = '[User] Login Redirect';

export class LoadUser implements Action {
  readonly type = LOAD_USER;

  constructor(public payload: any) {}
}
export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadUserFailure implements Action {
  readonly type = LOAD_USER_FAILURE;

  constructor(public payload: any) {}
}
export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}
export class UserSignOut implements Action {
  readonly type = USER_SIGN_OUT;
}
export class UserSignOutSuccess implements Action {
  readonly type = USER_SIGN_OUT_SUCCESS;
}
export class SignUp implements Action {
  readonly type = SIGN_UP;

  constructor(public payload: any) {}
}
export class SignUpSuccess implements Action {
  readonly type = SIGN_UP_SUCCESS;

  constructor(public payload: any) {}
}

export type Actions =
  | LoadUser
  | LoadUserSuccess
  | LoadUserFailure
  | LoginRedirect
  | UserSignOut
  | UserSignOutSuccess
  | SignUp
  | SignUpSuccess;
