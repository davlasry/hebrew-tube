import {
  WordsState,
  INITIAL_WORDS_STATE,
  wordsReducer
} from './words/state/words.reducers';
import { ActionReducerMap } from '@ngrx/store';
import {
  INITIAL_USER_STATE,
  UserState,
  userReducer
} from './authentication/state/user.reducers';

// APPLICATION STATE
export interface ApplicationState {
  words: WordsState;
  user: UserState;
}

// INITIAL STATE
export const INITIAL_APPLICATION_STATE: ApplicationState = {
  words: INITIAL_WORDS_STATE,
  user: INITIAL_USER_STATE
};

// GLOBAL REDUCER
export const appReducers: ActionReducerMap<ApplicationState> = {
  words: wordsReducer,
  user: userReducer
};
