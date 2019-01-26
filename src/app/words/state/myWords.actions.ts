import { Action } from '@ngrx/store';

export const LOAD_MY_WORDS = '[Words-List] Load My Words';
export const LOAD_MY_WORDS_SUCCESS = '[Words-List] Load My Words Success';
export const ADD_TO_MY_WORDS = '[Words-List] Add To My Words';
export const DELETE_FROM_MY_WORDS = '[Words-List] Delete From My Words';

export class LoadMyWords implements Action {
  readonly type = LOAD_MY_WORDS;

  constructor(public payload: any) {}
}
export class LoadMyWordsSuccess implements Action {
  readonly type = LOAD_MY_WORDS_SUCCESS;

  constructor(public payload: any) {}
}
export class AddToMyWords implements Action {
  readonly type = ADD_TO_MY_WORDS;

  constructor(public payload: any) {}
}
export class DeleteFromMyWords implements Action {
  readonly type = DELETE_FROM_MY_WORDS;

  constructor(public payload: any) {}
}

export type Actions =
  | LoadMyWords
  | AddToMyWords
  | DeleteFromMyWords
  | LoadMyWordsSuccess;
