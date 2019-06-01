import * as myVideosActions from '../actions/myVideos.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// MYVIDEOS STATE INTERFACE
export interface MyVideosState extends EntityState<any> {
  entities: { [id: number]: any };
  loading: Boolean;
  loaded: Boolean;
}

// // SORT FUNCTION
// export function sortByCreatedAt(ob1, ob2): number {
//   return ob2.createdAt.localeCompare(ob1.createdAt);
// }

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: video => video.id_video._id
  // sortComparer: sortByCreatedAt
});

// INITIAL MYVIDEOS STATE
export const INITIAL_MY_VIDEOS_STATE: MyVideosState = adapter.getInitialState({
  entities: {},
  loading: false,
  loaded: false
});

// MYVIDEOS REDUCER
export function myVideosReducer(
  state: MyVideosState = INITIAL_MY_VIDEOS_STATE,
  action: myVideosActions.Actions
): MyVideosState {
  switch (action.type) {
    case myVideosActions.LOAD_MY_VIDEOS: {
      // console.log('LOAD MY VIDEOS REDUCER', action.payload);
      return {
        ...state,
        loading: true
      };
    }

    case myVideosActions.LOAD_MY_VIDEOS_SUCCESS: {
      // console.log('LOAD MY VIDEOS SUCCESS REDUCER', action.payload);
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case myVideosActions.ADD_TO_MY_VIDEOS: {
      // console.log('ADD TO MY VIDEOS REDUCER', action.payload);
      return adapter.addOne(action.payload.video, state);
    }

    case myVideosActions.DELETE_MANY_FROM_MY_VIDEOS_SUCCESS: {
      // console.log('DELETE MANY FROM MY VIDEOS REDUCER', action.payload);
      return adapter.removeMany(action.payload.videos, state);
    }

    case myVideosActions.DELETE_FROM_MY_VIDEOS_SUCCESS: {
      // console.log('DELETE FROM MY VIDEOS REDUCER', action.payload);
      return adapter.removeOne(action.payload, state);
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

export const getMyVideos = (state: MyVideosState) => state.entities;
export const getMyVideosLoading = (state: MyVideosState) => state.loading;
export const getMyVideosLoaded = (state: MyVideosState) => state.loaded;

// export const metaReducers: MetaReducer<ApplicationState>[] =
//   !environment.production ? [storeFreeze] : [];
