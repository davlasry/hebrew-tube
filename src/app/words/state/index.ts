import * as fromAllWords from './words.reducers';
import * as fromMyWords from './myWords.reducers';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { getMyWordsIds } from './myWords.selectors';

export interface WordsState {
  allWords: fromAllWords.AllWordsState;
  myWords: fromMyWords.MyWordsState;
}

// INITIAL STATE
export const INITIAL_WORDS_STATE: WordsState = {
  allWords: fromAllWords.INITIAL_ALL_WORDS_STATE,
  myWords: fromMyWords.INITIAL_MY_WORDS_STATE
};

export const reducers: ActionReducerMap<any> = {
  allWords: fromAllWords.allWordsReducer,
  myWords: fromMyWords.myWordsReducer
};

export const getWordsState = createFeatureSelector<WordsState>('words');

// export const getWordById = (id: string) => {
//   createSelector(
//     getWordsEntities,
//     words => words[id]
//   );
// };
