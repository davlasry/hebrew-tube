import { createSelector } from '@ngrx/store';
import * as fromCollections from '../reducers/collections.reducers';
import { getWordsState, WordsState } from '..';

export const getCollectionsState = createSelector(
  getWordsState,
  (state: WordsState) => {
    // console.log('state:', state);
    return state.collections;
  }
);
export const getCollections = createSelector(
  getCollectionsState,
  fromCollections.selectAll
);
export const getCollectionsEntities = createSelector(
  getCollectionsState,
  fromCollections.selectEntities
);
export const getCollectionsLoading = createSelector(
  getCollectionsState,
  fromCollections.getCollectionsLoading
);
export const getCollectionsLoaded = createSelector(
  getCollectionsState,
  fromCollections.getCollectionsLoaded
);

export const getCollectionById = (id: string) => {
  // console.log('id:', id);
  return createSelector(
    getCollectionsEntities,
    collections => {
      // console.log('collections:', collections);
      return collections[id];
    }
  );
};
