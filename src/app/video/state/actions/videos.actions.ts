import { Action } from '@ngrx/store';

export const LOAD_VIDEO = '[Videos-List] Load Video';
export const LOAD_VIDEO_SUCCESS = '[Videos-List] Load Video Success';
export const LOAD_VIDEOS = '[Videos-List] Load Videos';
export const LOAD_VIDEOS_SUCCESS = '[Videos-List] Load Videos Success';
export const CREATE_VIDEO = '[Videos-List] Create Video';
export const CREATE_VIDEO_SUCCESS = '[Videos-List] Create Video Success';
export const DELETE_VIDEO = '[Videos-List] Delete Video';
export const DELETE_VIDEO_SUCCESS = '[Videos-List] Delete Video Success';

export class LoadVideo implements Action {
  readonly type = LOAD_VIDEO;
}
export class LoadVideoSuccess implements Action {
  readonly type = LOAD_VIDEO_SUCCESS;
}
export class LoadVideos implements Action {
  readonly type = LOAD_VIDEOS;
}
export class LoadVideosSuccess implements Action {
  readonly type = LOAD_VIDEOS_SUCCESS;

  constructor(public payload: any) {}
}
export class DeleteVideo implements Action {
  readonly type = DELETE_VIDEO;

  constructor(public payload: any) {}
}
export class DeleteVideoSuccess implements Action {
  readonly type = DELETE_VIDEO_SUCCESS;

  constructor(public payload: any) {}
}
export class CreateVideo implements Action {
  readonly type = CREATE_VIDEO;

  constructor(public payload: any) {}
}
export class CreateVideoSuccess implements Action {
  readonly type = CREATE_VIDEO_SUCCESS;

  constructor(public payload: any) {}
}

export type Actions =
  | LoadVideo
  | LoadVideoSuccess
  | LoadVideos
  | LoadVideosSuccess
  | DeleteVideo
  | DeleteVideoSuccess
  | CreateVideo
  | CreateVideoSuccess;
