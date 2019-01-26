import { Action } from '@ngrx/store';

export const LOAD_VIDEOS = '[Videos-List] Load Videos';
export const LOAD_VIDEOS_SUCCESS = '[Videos-List] Load Videos Success';

export class LoadVideos implements Action {
  readonly type = LOAD_VIDEOS;
}
export class LoadVideosSuccess implements Action {
  readonly type = LOAD_VIDEOS_SUCCESS;

  constructor(public payload: any) {}
}

export type Actions = LoadVideos | LoadVideosSuccess;
