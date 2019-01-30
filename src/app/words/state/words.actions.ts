import { Action } from '@ngrx/store';

export const LOAD_WORDS = '[Words-List] Load Words';
export const LOAD_WORDS_SUCCESS = '[Words-List] Load Words Sucess';
export const EDIT_WORD = '[Words-List] Edit Word';
export const ADD_WORD = '[Words-List] Add Word';
export const ADD_WORD_SUCCESS = '[Words-List] Add Word Success';
export const DELETE_WORDS = '[Words-List] Delete Words';

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

export class AddWordSuccess implements Action {
  readonly type = ADD_WORD_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteWords implements Action {
  readonly type = DELETE_WORDS;

  constructor(public payload: any) {}
}

export type Actions =
  | LoadWords
  | LoadWordsSuccess
  | AddWord
  | EditWord
  | DeleteWords
  | AddWordSuccess;
