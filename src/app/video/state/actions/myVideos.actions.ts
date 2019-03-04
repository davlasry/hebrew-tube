import { Action } from '@ngrx/store';

export const LOAD_MY_VIDEOS = '[My Videos] Load My Videos';
export const LOAD_MY_VIDEOS_SUCCESS = '[My Videos] Load My Videos Success';
export const ADD_TO_MY_VIDEOS = '[My Videos] Add To My Videos';
export const DELETE_FROM_MY_VIDEOS = '[My Videos] Delete From My Videos';
export const DELETE_MANY_FROM_MY_VIDEOS =
  '[My Videos] Delete Many From My Videos';
export const DELETE_MANY_FROM_MY_VIDEOS_SUCCESS =
  '[My Videos] Delete Many From My Videos Success';
export const ADD_TO_MY_VIDEOS_SUCCESS = '[Words-List] Add To My Videos Success';
export const DELETE_FROM_MY_VIDEOS_SUCCESS =
  '[My Videos] Delete From My Videos Success';

export class LoadMyVideos implements Action {
  readonly type = LOAD_MY_VIDEOS;

  constructor(public payload: any) {}
}
export class LoadMyVideosSuccess implements Action {
  readonly type = LOAD_MY_VIDEOS_SUCCESS;

  constructor(public payload: any) {}
}
export class AddToMyVideos implements Action {
  readonly type = ADD_TO_MY_VIDEOS;

  constructor(public payload: any) {}
}
export class AddToMyVideosSuccess implements Action {
  readonly type = ADD_TO_MY_VIDEOS_SUCCESS;

  constructor(public payload: any) {}
}
export class DeleteFromMyVideos implements Action {
  readonly type = DELETE_FROM_MY_VIDEOS;

  constructor(public payload: any) {}
}
export class DeleteManyFromMyVideos implements Action {
  readonly type = DELETE_MANY_FROM_MY_VIDEOS;

  constructor(public payload: any) {}
}
export class DeleteManyFromMyVideosSuccess implements Action {
  readonly type = DELETE_MANY_FROM_MY_VIDEOS_SUCCESS;

  constructor(public payload: any) {}
}
export class DeleteFromMyVideosSuccess implements Action {
  readonly type = DELETE_FROM_MY_VIDEOS_SUCCESS;

  constructor(public payload: any) {}
}

export type Actions =
  | LoadMyVideos
  | AddToMyVideos
  | DeleteFromMyVideos
  | DeleteManyFromMyVideos
  | AddToMyVideosSuccess
  | DeleteFromMyVideosSuccess
  | DeleteManyFromMyVideosSuccess
  | LoadMyVideosSuccess;
