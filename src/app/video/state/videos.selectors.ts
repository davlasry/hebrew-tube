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
export const getIsVideosLoading = createSelector(
  getVideoState,
  fromVideos.getVideosLoading
);
export const getIsVideosLoaded = createSelector(
  getVideoState,
  fromVideos.getVideosLoaded
);

export const getVideoById = createSelector(
  getVideosEntities,
  (entities, props) => entities[props.id]
);

export const getVideosByID = createSelector(
  getVideosEntities,
  (entities, props) => props.ids.map(id => entities[id])
);
