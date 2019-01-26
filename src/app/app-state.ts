import { ActionReducerMap } from '@ngrx/store';
import {
  INITIAL_USER_STATE,
  UserState,
  userReducer
} from './authentication/state/user.reducers';

// APPLICATION STATE
export interface ApplicationState {
  user: UserState;
}

// INITIAL STATE
export const INITIAL_APPLICATION_STATE: ApplicationState = {
  user: INITIAL_USER_STATE
};

// GLOBAL REDUCER
export const appReducers: ActionReducerMap<ApplicationState> = {
  user: userReducer
};
