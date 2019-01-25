import { Action } from '@ngrx/store';

export const LOAD_WORDS = '[Words-List] Load Words';
export const LOAD_WORDS_SUCCESS = '[Words-List] Load Words Sucess';
export const EDIT_WORD = '[Words-List] Edit Word';
export const ADD_WORD = '[Words-List] Add Word';
export const LOAD_MY_WORDS = '[Words-List] Load My Words';
export const LOAD_MY_WORDS_SUCCESS = '[Words-List] Load My Words Success';

export class LoadWords implements Action {
  readonly type = LOAD_WORDS;
}

export class LoadWordsSuccess implements Action {
  readonly type = LOAD_WORDS_SUCCESS;

  constructor(public payload: any) {}
}

export class EditWord implements Action {
  readonly type = EDIT_WORD;

  constructor(public payload: any) {}
}

export class AddWord implements Action {
  readonly type = ADD_WORD;

  constructor(public payload: any) {}
}

export class LoadMyWords implements Action {
  readonly type = LOAD_MY_WORDS;

  constructor(public payload: any) {}
}

export class LoadMyWordsSuccess implements Action {
  readonly type = LOAD_MY_WORDS_SUCCESS;

  constructor(public payload: any) {}
}

export type Actions =
  | LoadWords
  | LoadWordsSuccess
  | AddWord
  | EditWord
  | LoadMyWords
  | LoadMyWordsSuccess;
