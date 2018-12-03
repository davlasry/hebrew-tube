import { WordsState, INITIAL_WORDS_STATE, wordsReducer } from './words/state/words.reducer';
import { ActionReducerMap } from '@ngrx/store';

// APPLICATION STATE
export interface ApplicationState {
  words: WordsState;
}

// INITIAL STATE
export const INITIAL_APPLICATION_STATE: ApplicationState = {
  words: INITIAL_WORDS_STATE,
};

// GLOBAL REDUCER
export const appReducers: ActionReducerMap<ApplicationState> = {
  words: wordsReducer,
};
