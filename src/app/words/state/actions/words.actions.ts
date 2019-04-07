import { Action } from '@ngrx/store';

export const LOAD_WORDS = '[Words-List] Load Words';
export const LOAD_WORDS_SUCCESS = '[Words-List] Load Words Sucess';
export const LOAD_WORDS_FAIL = '[Words-List] Load Words Fail';
export const EDIT_WORD = '[Words-List] Edit Word';
export const EDIT_WORD_SUCCESS = '[Words-List] Edit Word Success';
export const ADD_WORD = '[Words-List] Add Word';
export const ADD_WORD_SUCCESS = '[Words-List] Add Word Success';
export const DELETE_WORD = '[Words-List] Delete Word';
export const DELETE_WORD_SUCCESS = '[Words-List] Delete Word Success';
export const DELETE_MANY_WORDS = '[Words-List] Delete Many Word';
export const DELETE_MANY_WORDS_SUCCESS =
  '[Words-List] Delete Many Words Success';

export class LoadWords implements Action {
  readonly type = LOAD_WORDS;
}

export class LoadWordsSuccess implements Action {
  readonly type = LOAD_WORDS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadWordsFail implements Action {
  readonly type = LOAD_WORDS_FAIL;

  constructor(public payload: any) {}
}

export class EditWord implements Action {
  readonly type = EDIT_WORD;

  constructor(public payload: any) {}
}

export class EditWordSuccess implements Action {
  readonly type = EDIT_WORD_SUCCESS;

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

export class DeleteWord implements Action {
  readonly type = DELETE_WORD;

  constructor(public payload: any) {}
}
export class DeleteWordSuccess implements Action {
  readonly type = DELETE_WORD_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteManyWords implements Action {
  readonly type = DELETE_MANY_WORDS;

  constructor(public payload: any) {}
}
export class DeleteManyWordsSuccess implements Action {
  readonly type = DELETE_MANY_WORDS_SUCCESS;

  constructor(public payload: any) {}
}

export type Actions =
  | LoadWords
  | LoadWordsSuccess
  | LoadWordsFail
  | AddWord
  | EditWord
  | EditWordSuccess
  | DeleteManyWords
  | DeleteManyWordsSuccess
  | DeleteWord
  | DeleteWordSuccess
  | AddWordSuccess;
