import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WordsState, selectAll, selectEntities } from './words.reducers';

export const getWordsState = createFeatureSelector<any>('words');

export const getAllWords = createSelector(
  getWordsState,
  selectAll
);
export const getWordsEntities = createSelector(
  getWordsState,
  selectEntities
);
export const getWordsLoading = createSelector(
  getWordsState,
  (state: WordsState) => state.loading
);
export const getWordsLoaded = createSelector(
  getWordsState,
  (state: WordsState) => state.loaded
);

export const getWordById = (id: string) => {
  createSelector(
    getWordsEntities,
    words => words[id]
  );
};
