import * as fromVideos from '../actions/videos.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// VIDEOS STATE INTERFACE
export interface AllVideosState extends EntityState<any> {
  loading: Boolean;
  loaded: Boolean;
}

// SORT FUNCTION
export function sortByCreatedAt(ob1, ob2): number {
  return ob2.createdAt.localeCompare(ob1.createdAt);
}

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: video => video._id,
  sortComparer: sortByCreatedAt
});

// INITIAL VIDEOS STATE
export const INITIAL_ALL_VIDEOS_STATE: AllVideosState = adapter.getInitialState(
  {
    // entities: {},
    loading: false,
    loaded: false
  }
);

// VIDEOS REDUCER
export function allVideosReducer(
  state: AllVideosState = INITIAL_ALL_VIDEOS_STATE,
  action: fromVideos.Actions
): AllVideosState {
  switch (action.type) {
    case fromVideos.LOAD_VIDEOS: {
      // console.log('LOAD VIDEOS REDUCER', action.payload);
      return Object.assign({}, state, {
        loading: true
      });
    }

    case fromVideos.LOAD_VIDEOS_SUCCESS: {
      // console.log('LOAD VIDEOS SUCCESS REDUCER', action.payload);
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case fromVideos.DELETE_VIDEO_SUCCESS: {
      // console.log('DELETE VIDEO SUCCESS REDUCER', action.payload);
      return adapter.removeOne(action.payload, state);
    }

    case fromVideos.CREATE_VIDEO: {
      console.log(action.payload);
      return state;
    }

    case fromVideos.CREATE_VIDEO_SUCCESS: {
      // console.log('CREATE VIDEO SUCCESS REDUCER', action.payload);
      return adapter.addOne(action.payload, state);
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

export const getAllVideos = (state: AllVideosState) => state.entities;
export const getAllVideosLoading = (state: AllVideosState) => state.loading;
export const getAllVideosLoaded = (state: AllVideosState) => state.loaded;
