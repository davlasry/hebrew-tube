import * as myWordsList from './myWords.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// WORD STATE INTERFACE
export interface MyWordsState extends EntityState<any> {
  entities: { [id: number]: any };
  loading: Boolean;
  loaded: Boolean;
}

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: word => word._id
});

// INITIAL WORDS STATE
export const INITIAL_MY_WORDS_STATE: MyWordsState = adapter.getInitialState({
  entities: {},
  loading: false,
  loaded: false
});

// WORDS REDUCER
export function myWordsReducer(
  state: MyWordsState = INITIAL_MY_WORDS_STATE,
  action: myWordsList.Actions
): MyWordsState {
  switch (action.type) {
    case myWordsList.LOAD_MY_WORDS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        myWordsLoading: false,
        myWordsLoaded: true
      });
    }

    case myWordsList.ADD_TO_MY_WORDS: {
      return adapter.addOne(action.payload.word, state);
    }

    case myWordsList.DELETE_FROM_MY_WORDS: {
      console.log(action.payload);
      return adapter.removeOne(action.payload.word._id, state);
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

// export const getSelected = createSelector(
//   getEntities,
//   getSelectedId,
//   (entities, selectedId) => {
//     return entities[selectedId];
//   }
// );

// export const getAll = createSelector(
//   getEntities,
//   getIds,
//   (entities, ids) => {
//     return ids.map(id => entities[id]);
//   }
// );

// export const metaReducers: MetaReducer<ApplicationState>[] =
//   !environment.production ? [storeFreeze] : [];
