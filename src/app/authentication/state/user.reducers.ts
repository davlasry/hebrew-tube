import {
  MetaReducer,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as userActions from './user.actions';

// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// USER STATE INTERFACE
// export interface UserState extends EntityState<any> {
//   user: any;
//   loggedIn: Boolean;
// }
export interface UserState {
  user: any;
  loggedIn: Boolean;
}

// // NGRX/ENTITY
// export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
//   selectId: user => user._id
// });

// INITIAL USER STATE
export const INITIAL_USER_STATE: UserState = {
  user: {},
  loggedIn: false
};

// USER REDUCER
export function userReducer(
  state: UserState = INITIAL_USER_STATE,
  action: userActions.Actions
): UserState {
  switch (action.type) {
    case userActions.LOAD_USER:
      console.log('LOAD USER');
      return Object.assign({}, state, {
        loggedIn: true
      });

    case userActions.LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.payload
      });

    // case user.LOAD_USER_SUCCESS:
    //   return adapter.addAll(action.payload, {
    //     ...state,
    //     loggedIn: true
    //   });

    default: {
      return state;
    }
  }
}

// // NGRX/ENTITY SELECTORS
// export const {
//   selectAll,
//   selectEntities,
//   selectIds,
//   selectTotal
// } = adapter.getSelectors();

// export const metaReducers: MetaReducer<ApplicationState>[] =
//   !environment.production ? [storeFreeze] : [];
