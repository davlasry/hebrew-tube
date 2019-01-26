import * as userActions from './user.actions';

// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// // NGRX/ENTITY
// export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
//   selectId: user => user._id
// });

// export interface UserState extends EntityState<any> {
//   user: any;
//   loggedIn: Boolean;
// }

// USER STATE INTERFACE
export interface UserState {
  user: any;
  loggedIn: Boolean;
}

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
      // console.log('LOAD USER');
      return Object.assign({}, state, {
        loggedIn: true
      });

    case userActions.LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.payload
      });

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
