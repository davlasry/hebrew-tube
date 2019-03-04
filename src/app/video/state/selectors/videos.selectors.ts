import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromVideos from '../reducers/videos.reducers';
import { getVideosState, VideosState } from '..';

export const getAllVideosState = createSelector(
  getVideosState,
  (state: VideosState) => state.allVideos
);

export const getAllVideos = createSelector(
  getAllVideosState,
  fromVideos.selectAll
);
export const getVideosEntities = createSelector(
  getAllVideosState,
  fromVideos.selectEntities
);
export const getVideosIds = createSelector(
  getAllVideosState,
  fromVideos.selectIds
);
export const getIsVideosLoading = createSelector(
  getAllVideosState,
  fromVideos.getAllVideosLoading
);
export const getIsVideosLoaded = createSelector(
  getAllVideosState,
  fromVideos.getAllVideosLoaded
);

export const getVideoById = createSelector(
  getVideosEntities,
  (entities, props) => entities[props.id]
);

export const getVideosByID = createSelector(
  getVideosEntities,
  (entities, props) => props.ids.map(id => entities[id])
);
