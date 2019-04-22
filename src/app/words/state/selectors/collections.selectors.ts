import { createSelector } from '@ngrx/store';
import * as fromCollections from '../reducers/collections.reducers';
import { getWordsState, WordsState } from '..';

export const getCollectionsState = createSelector(
  getWordsState,
  (state: WordsState) => state.collections
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
  createSelector(
    getCollectionsEntities,
    words => words[id]
  );
};
