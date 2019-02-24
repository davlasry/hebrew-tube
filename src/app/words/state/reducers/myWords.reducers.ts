import * as myWordsActions from '../actions/myWords.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// MYWORDS STATE INTERFACE
export interface MyWordsState extends EntityState<any> {
  entities: { [id: number]: any };
  loading: Boolean;
  loaded: Boolean;
}

// // SORT FUNCTION
// export function sortByCreatedAt(ob1, ob2): number {
//   return ob2.createdAt.localeCompare(ob1.createdAt);
// }

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: word => word.id_word
  // sortComparer: sortByCreatedAt
});

// INITIAL MYWORDS STATE
export const INITIAL_MY_WORDS_STATE: MyWordsState = adapter.getInitialState({
  entities: {},
  loading: false,
  loaded: false
});

// MYWORDS REDUCER
export function myWordsReducer(
  state: MyWordsState = INITIAL_MY_WORDS_STATE,
  action: myWordsActions.Actions
): MyWordsState {
  switch (action.type) {
    case myWordsActions.LOAD_MY_WORDS: {
      console.log('LOAD MY WORDS ACTION', action.payload);
      return {
        ...state,
        loading: true
      };
    }

    case myWordsActions.LOAD_MY_WORDS_SUCCESS: {
      console.log('LOAD MY WORDS REDUCER', action.payload);
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case myWordsActions.ADD_TO_MY_WORDS: {
      console.log('ADD TO MY WORDS REDUCER', action.payload);
      return adapter.addOne(action.payload.word, state);
    }

    case myWordsActions.DELETE_MANY_FROM_MY_WORDS_SUCCESS: {
      console.log('DELETE MANY FROM MY WORDS REDUCER', action.payload);
      return adapter.removeMany(action.payload.words, state);
    }

    case myWordsActions.DELETE_FROM_MY_WORDS_SUCCESS: {
      console.log('DELETE FROM MY WORDS REDUCER', action.payload);
      return adapter.removeOne(action.payload, state);
    }

    default: {
      return state;
    }
  }
}

// NGRX/ENTITY SELECTORS
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const getMyWords = (state: MyWordsState) => state.entities;
export const getMyWordsLoading = (state: MyWordsState) => state.loading;
export const getMyWordsLoaded = (state: MyWordsState) => state.loaded;

// export const metaReducers: MetaReducer<ApplicationState>[] =
//   !environment.production ? [storeFreeze] : [];
