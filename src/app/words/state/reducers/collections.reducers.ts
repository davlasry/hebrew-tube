import { createSelector } from '@ngrx/store';

import * as collectionsList from '../actions/collections.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// WORD STATE INTERFACE
export interface CollectionsState extends EntityState<any> {
  loading: Boolean;
  loaded: Boolean;
}

// SORT FUNCTION
export function sortByCreatedAt(ob1, ob2): number {
  return ob2.createdAt.localeCompare(ob1.createdAt);
}

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: collection => collection._id
  // sortComparer: sortByCreatedAt
});

// INITIAL WORDS STATE
export const INITIAL_COLLECTIONS_STATE: CollectionsState = adapter.getInitialState(
  {
    // entities: {},
    loading: false,
    loaded: false
  }
);

// WORDS REDUCER
export function collectionsReducer(
  state: CollectionsState = INITIAL_COLLECTIONS_STATE,
  action: collectionsList.Actions
): CollectionsState {
  switch (action.type) {
    case collectionsList.LOAD_COLLECTIONS: {
      // console.log('LOAD COLLECTIONS REDUCER');
      return Object.assign({}, state, {
        loading: true
      });
    }

    case collectionsList.LOAD_COLLECTIONS_SUCCESS: {
      // console.log('LOAD COLLECTIONS SUCCESS REDUCER', action.payload);
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case collectionsList.LOAD_COLLECTIONS_FAIL: {
      // console.log('LOAD WORDS FAIL REDUCER', action.payload.error.message);
      return state;
    }

    // case collectionsList.ADD_COLLECTION: {
    //   console.log('ADD COLLECTION REDUCER', action.payload.data);
    //   return adapter.addOne(action.payload.data, state);
    // }

    case collectionsList.ADD_COLLECTION_SUCCESS: {
      console.log('ADD COLLECTION SUCCESS REDUCER', action.payload.data);
      return adapter.addOne(action.payload.data, state);
    }

    case collectionsList.EDIT_COLLECTION_SUCCESS: {
      console.log('EDIT COLLECTION SUCCESS REDUCER', action.payload);
      console.log('state', state);
      return adapter.updateOne(
        { id: action.payload._id, changes: action.payload },
        state
      );
    }

    case collectionsList.DELETE_COLLECTION_SUCCESS: {
      // console.log(action.payload);
      return adapter.removeOne(action.payload, state);
    }

    case collectionsList.ADD_WORD_TO_COLLECTION: {
      console.log('ADD WORD TO COLLECTION REDUCER:', action.payload);
      const { collectionId, word } = action.payload;
      const updatedCollection = {
        ...state.entities[collectionId]
      };
      updatedCollection.words = [...updatedCollection.words, word];
      return adapter.updateOne(
        { id: collectionId, changes: updatedCollection },
        state
      );
    }

    case collectionsList.REMOVE_WORD_FROM_COLLECTION: {
      console.log('REMOVE WORD FROM COLLECTION REDUCER:', action.payload);
      const { collectionId, wordId } = action.payload;
      const updatedCollection = {
        ...state.entities[collectionId]
      };
      updatedCollection.words = [
        ...updatedCollection.words.filter(item => item._id !== wordId)
      ];
      return adapter.updateOne(
        { id: collectionId, changes: updatedCollection },
        state
      );
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

export const getCollectionsLoading = (state: CollectionsState) => {
  // console.log(state);
  return state.loading;
};
export const getCollectionsLoaded = (state: CollectionsState) => {
  // console.log(state);
  return state.loaded;
};
// export const getCollections = (state: CollectionsState) => state.entities;
