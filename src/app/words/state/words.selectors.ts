import { createSelector } from '@ngrx/store';
import * as fromAllWords from './words.reducers';
import { getWordsState, WordsState } from '.';

export const getAllWordsState = createSelector(
  getWordsState,
  (state: WordsState) => state.allWords
);
export const getAllWords = createSelector(
  getAllWordsState,
  fromAllWords.selectAll
);
export const getWordsEntities = createSelector(
  getAllWordsState,
  fromAllWords.selectEntities
);
export const getWordsLoading = createSelector(
  getAllWordsState,
  fromAllWords.getAllWordsLoading
);
export const getWordsLoaded = createSelector(
  getAllWordsState,
  fromAllWords.getAllWordsLoaded
);

export const getWordById = (id: string) => {
  createSelector(
    getWordsEntities,
    words => words[id]
  );
};
