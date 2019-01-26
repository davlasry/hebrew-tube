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
import {
  MyWordsState,
  INITIAL_MY_WORDS_STATE,
  myWordsReducer
} from './words/state/myWords.reducers';

// APPLICATION STATE
export interface ApplicationState {
  words: WordsState;
  myWords: MyWordsState;
  user: UserState;
}

// INITIAL STATE
export const INITIAL_APPLICATION_STATE: ApplicationState = {
  words: INITIAL_WORDS_STATE,
  myWords: INITIAL_MY_WORDS_STATE,
  user: INITIAL_USER_STATE
};

// GLOBAL REDUCER
export const appReducers: ActionReducerMap<ApplicationState> = {
  words: wordsReducer,
  myWords: myWordsReducer,
  user: userReducer
};
