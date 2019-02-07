import { Action } from '@ngrx/store';

export const LOAD_VIDEOS = '[Videos-List] Load Videos';
export const LOAD_VIDEOS_SUCCESS = '[Videos-List] Load Videos Success';
export const CREATE_VIDEO = '[Videos-List] Create Video';
export const CREATE_VIDEO_SUCCESS = '[Videos-List] Create Video Success';

export class LoadVideos implements Action {
  readonly type = LOAD_VIDEOS;
}
export class LoadVideosSuccess implements Action {
  readonly type = LOAD_VIDEOS_SUCCESS;

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
  | LoadVideos
  | LoadVideosSuccess
  | CreateVideo
  | CreateVideoSuccess;
