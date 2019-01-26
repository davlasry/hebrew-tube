import * as fromWords from './words/state/';
import { ActionReducerMap } from '@ngrx/store';
import {
  INITIAL_USER_STATE,
  UserState,
  userReducer
} from './authentication/state/user.reducers';
import { WordsState, INITIAL_WORDS_STATE } from './words/state';

// APPLICATION STATE
export interface ApplicationState {
  // words: WordsState;
  user: UserState;
}

// INITIAL STATE
export const INITIAL_APPLICATION_STATE: ApplicationState = {
  // words: INITIAL_WORDS_STATE,
  user: INITIAL_USER_STATE
};

// GLOBAL REDUCER
export const appReducers: ActionReducerMap<ApplicationState> = {
  // words: fromWords.reducers,
  user: userReducer
};
