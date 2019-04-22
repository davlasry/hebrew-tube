import * as fromAllWords from './reducers/words.reducers';
import * as fromMyWords from './reducers/myWords.reducers';
import * as fromCollections from './reducers/collections.reducers';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export interface WordsState {
  allWords: fromAllWords.AllWordsState;
  myWords: fromMyWords.MyWordsState;
  collections: fromCollections.CollectionsState;
}

// INITIAL STATE
export const INITIAL_WORDS_STATE: WordsState = {
  allWords: fromAllWords.INITIAL_ALL_WORDS_STATE,
  myWords: fromMyWords.INITIAL_MY_WORDS_STATE,
  collections: fromCollections.INITIAL_COLLECTIONS_STATE
};

export const reducers: ActionReducerMap<any> = {
  allWords: fromAllWords.allWordsReducer,
  myWords: fromMyWords.myWordsReducer,
  collections: fromCollections.collectionsReducer
};

export const getWordsState = createFeatureSelector<WordsState>('words');
