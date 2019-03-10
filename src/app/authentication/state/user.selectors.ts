import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers';

export const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  getUserState,
  (state: UserState) => state.user
);
export const getLoggedIn = createSelector(
  getUserState,
  (state: UserState) => state.loggedIn
);
export const isAdmin = createSelector(
  getUserState,
  (state: UserState) => state.user.role == 'admin'
);
export const getUserRole = createSelector(
  getUserState,
  (state: UserState) => state.user.role
);
