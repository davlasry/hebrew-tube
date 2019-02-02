import * as userActions from './user.actions';

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
    case userActions.LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.payload
      });

    case userActions.LOAD_USER_FAILURE: {
      return Object.assign({}, state, {
        loggedIn: false,
        user: action.payload
      });
    }

    case userActions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true
      });

    case userActions.LOGIN_FAILURE: {
      return Object.assign({}, state, {
        loggedIn: false
      });
    }

    case userActions.SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.payload
      });

    case userActions.USER_SIGN_OUT:
      return INITIAL_USER_STATE;

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
