import { Action } from '@ngrx/store';

export const LOAD_USER = '[User] Load User';
export const LOAD_USER_SUCCESS = '[User] Load User Sucess';
export const LOGGED_IN = '[User] User Logged In';

export class LoadUser implements Action {
  readonly type = LOAD_USER;
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: any) {}
}

export class LoggedIn implements Action {
  readonly type = LOGGED_IN;

  constructor(public payload: any) {}
}

export type Actions = LoadUser | LoadUserSuccess | LoggedIn;
