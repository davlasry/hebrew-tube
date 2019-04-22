import { Action } from '@ngrx/store';

export const LOAD_COLLECTIONS = '[Collections-List] Load Collections';
export const LOAD_COLLECTIONS_SUCCESS = '[Collections-List] Load Words Sucess';
export const LOAD_COLLECTIONS_FAIL = '[Collections-List] Load Words Fail';
export const EDIT_COLLECTION = '[Collections-List] Edit Word';
export const EDIT_COLLECTION_SUCCESS = '[Collections-List] Edit Word Success';
export const ADD_COLLECTION = '[Collections-List] Add Word';
export const ADD_COLLECTION_SUCCESS = '[Collections-List] Add Word Success';
export const DELETE_COLLECTION = '[Collections-List] Delete Word';
export const DELETE_COLLECTION_SUCCESS =
  '[Collections-List] Delete Word Success';

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

export type Actions =
  | LoadCollections
  | LoadCollectionsSuccess
  | LoadCollectionsFail
  | AddCollection
  | AddCollectionSuccess
  | EditCollection
  | EditCollectionSuccess
  | DeleteCollection
  | DeleteCollectionSuccess;
