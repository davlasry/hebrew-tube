import { createSelector } from '@ngrx/store';
import * as fromMyWords from './myWords.reducers';
import { getWordsState, WordsState } from '.';

export const getMyWordsState = createSelector(
  getWordsState,
  (state: WordsState) => state.myWords
);
export const getAllMyWords = createSelector(
  getMyWordsState,
  fromMyWords.selectAll
);
export const getMyWordsEntities = createSelector(
  getMyWordsState,
  fromMyWords.selectEntities
);
export const getMyWordsIds = createSelector(
  getMyWordsState,
  fromMyWords.selectIds
);
export const getMyWordsLoading = createSelector(
  getMyWordsState,
  fromMyWords.getMyWordsLoading
);
export const getMyWordsLoaded = createSelector(
  getMyWordsState,
  fromMyWords.getMyWordsLoaded
);
