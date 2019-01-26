import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromVideos from './videos.reducers';

export const getVideoState = createFeatureSelector<fromVideos.VideosState>(
  'videos'
);

export const getAllVideos = createSelector(
  getVideoState,
  fromVideos.selectAll
);
export const getVideosEntities = createSelector(
  getVideoState,
  fromVideos.selectEntities
);
export const getVideosIds = createSelector(
  getVideoState,
  fromVideos.selectIds
);
export const getVideosLoading = createSelector(
  getVideoState,
  fromVideos.getVideosLoading
);
export const getVideosLoaded = createSelector(
  getVideoState,
  fromVideos.getVideosLoaded
);
