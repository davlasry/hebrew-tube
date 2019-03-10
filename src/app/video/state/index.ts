import * as fromAllVideos from './reducers/videos.reducers';
import * as fromMyVideos from './reducers/myVideos.reducers';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface VideosState {
  allVideos: fromAllVideos.AllVideosState;
  myVideos: fromMyVideos.MyVideosState;
}

// INITIAL STATE
export const INITIAL_VIDEOS_STATE: VideosState = {
  allVideos: fromAllVideos.INITIAL_ALL_VIDEOS_STATE,
  myVideos: fromMyVideos.INITIAL_MY_VIDEOS_STATE
};

export const reducers: ActionReducerMap<any> = {
  allVideos: fromAllVideos.allVideosReducer,
  myVideos: fromMyVideos.myVideosReducer
};

export const getVideosState = createFeatureSelector<VideosState>('videos');
