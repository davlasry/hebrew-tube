import { createSelector } from '@ngrx/store';
import * as fromMyVideos from '../reducers/myVideos.reducers';
import { VideosState, getVideosState } from '..';

export const getMyVideosState = createSelector(
  getVideosState,
  (state: VideosState) => state.myVideos
);
export const getAllMyVideos = createSelector(
  getMyVideosState,
  fromMyVideos.selectAll
);
export const getMyVideosEntities = createSelector(
  getMyVideosState,
  fromMyVideos.selectEntities
);
export const getMyVideosIds = createSelector(
  getMyVideosState,
  fromMyVideos.selectIds
);
export const getMyVideosLoading = createSelector(
  getMyVideosState,
  fromMyVideos.getMyVideosLoading
);
export const getMyVideosLoaded = createSelector(
  getMyVideosState,
  fromMyVideos.getMyVideosLoaded
);
