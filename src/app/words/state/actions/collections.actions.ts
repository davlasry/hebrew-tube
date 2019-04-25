import { Action } from '@ngrx/store';

export const LOAD_COLLECTIONS = '[Collections-List] Load Collections';
export const LOAD_COLLECTIONS_SUCCESS =
  '[Collections-List] Load Collections Sucess';
export const LOAD_COLLECTIONS_FAIL = '[Collections-List] Load Collections Fail';
export const EDIT_COLLECTION = '[Collections-List] Edit Collection';
export const EDIT_COLLECTION_SUCCESS =
  '[Collections-List] Edit Collection Success';
export const ADD_COLLECTION = '[Collections-List] Add Collection';
export const ADD_COLLECTION_SUCCESS =
  '[Collections-List] Add Collection Success';
export const DELETE_COLLECTION = '[Collections-List] Delete Collection';
export const DELETE_COLLECTION_SUCCESS =
  '[Collections-List] Delete Collection Success';
export const REMOVE_WORD_FROM_COLLECTION =
  '[Collections-List] Remove Word From Collection';
export const REMOVE_WORD_FROM_COLLECTION_SUCCESS =
  '[Collections-List] Remove Word From Collection Success';
export const ADD_WORD_TO_COLLECTION =
  '[Collections-List] Add Word To Collection';
export const ADD_WORD_TO_COLLECTION_SUCCESS =
  '[Collections-List] Add Word To Collection Success';

export class LoadCollections implements Action {
  readonly type = LOAD_COLLECTIONS;

  // constructor(public payload: any) {}
}

export class LoadCollectionsSuccess implements Action {
  readonly type = LOAD_COLLECTIONS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadCollectionsFail implements Action {
  readonly type = LOAD_COLLECTIONS_FAIL;

  constructor(public payload: any) {}
}

export class EditCollection implements Action {
  readonly type = EDIT_COLLECTION;

  constructor(public payload: any) {}
}

export class EditCollectionSuccess implements Action {
  readonly type = EDIT_COLLECTION_SUCCESS;

  constructor(public payload: any) {}
}

export class AddCollection implements Action {
  readonly type = ADD_COLLECTION;

  constructor(public payload: any) {}
}

export class AddCollectionSuccess implements Action {
  readonly type = ADD_COLLECTION_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteCollection implements Action {
  readonly type = DELETE_COLLECTION;

  constructor(public payload: any) {}
}
export class DeleteCollectionSuccess implements Action {
  readonly type = DELETE_COLLECTION_SUCCESS;

  constructor(public payload: any) {}
}
export class RemoveWordFromCollection implements Action {
  readonly type = REMOVE_WORD_FROM_COLLECTION;

  constructor(public payload: any) {}
}
export class RemoveWordFromCollectionSuccess implements Action {
  readonly type = REMOVE_WORD_FROM_COLLECTION_SUCCESS;

  constructor(public payload: any) {}
}
export class AddWordToCollection implements Action {
  readonly type = ADD_WORD_TO_COLLECTION;

  constructor(public payload: any) {}
}
export class AddWordToCollectionSuccess implements Action {
  readonly type = ADD_WORD_TO_COLLECTION_SUCCESS;

  constructor(public payload: any) {}
}

export type Actions =
  | LoadCollections
  | LoadCollectionsSuccess
  | LoadCollectionsFail
  | AddCollection
  | AddCollectionSuccess
  | EditCollection
  | EditCollectionSuccess
  | DeleteCollection
  | DeleteCollectionSuccess
  | RemoveWordFromCollection
  | RemoveWordFromCollectionSuccess
  | AddWordToCollection
  | AddWordToCollectionSuccess;
