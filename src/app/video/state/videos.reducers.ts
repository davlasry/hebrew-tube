import * as fromVideos from './videos.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// VIDEOS STATE INTERFACE
export interface VideosState extends EntityState<any> {
  entities: { [id: number]: any };
  loading: Boolean;
  loaded: Boolean;
}

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: video => video._id
});

// INITIAL VIDEOS STATE
export const INITIAL_VIDEOS_STATE: VideosState = adapter.getInitialState({
  entities: {},
  loading: false,
  loaded: false
});

// VIDEOS REDUCER
export function videosReducer(
  state: VideosState = INITIAL_VIDEOS_STATE,
  action: fromVideos.Actions
): VideosState {
  switch (action.type) {
    case fromVideos.LOAD_VIDEOS: {
      // console.log('LOAD VIDEOS');
      return Object.assign({}, state, {
        loading: true
      });
    }

    case fromVideos.LOAD_VIDEOS_SUCCESS: {
      // console.log(action.payload);
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    default: {
      return state;
    }
  }
}

// NGRX/ENTITY SELECTORS
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const getVideos = (state: VideosState) => state.entities;
export const getVideosLoading = (state: VideosState) => state.loading;
export const getVideosLoaded = (state: VideosState) => state.loaded;
