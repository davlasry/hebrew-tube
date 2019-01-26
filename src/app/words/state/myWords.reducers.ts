import { createSelector } from '@ngrx/store';

import * as myWordsList from './myWords.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// WORD STATE INTERFACE
export interface MyWordsState extends EntityState<any> {
  entities: { [id: string]: any };
  ids: string[];
  myWordsLoading: Boolean;
  myWordsLoaded: Boolean;
}

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: word => word._id
});

// INITIAL WORDS STATE
export const INITIAL_MY_WORDS_STATE: MyWordsState = adapter.getInitialState({
  entites: {},
  ids: [],
  myWordsLoading: false,
  myWordsLoaded: false
});

// WORDS REDUCER
export function myWordsReducer(
  state: MyWordsState = INITIAL_MY_WORDS_STATE,
  action: myWordsList.Actions
): MyWordsState {
  switch (action.type) {
    case myWordsList.LOAD_MY_WORDS_SUCCESS: {
      // console.log(action.payload);
      return adapter.addAll(action.payload, {
        ...state,
        myWordsLoading: false,
        myWordsLoaded: true
      });
    }

    case myWordsList.ADD_TO_MY_WORDS: {
      return adapter.addOne(action.payload, state);
    }

    case myWordsList.DELETE_FROM_MY_WORDS: {
      // console.log(action.payload);
      return adapter.removeOne(action.payload._id, state);
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

export const getEntities = (state: MyWordsState) => state.entities;

export const getIds = (state: MyWordsState) => state.ids;

// export const getSelectedId = (state: WordsState) => state.selectedBookId;

// export const getSelected = createSelector(
//   getEntities,
//   getSelectedId,
//   (entities, selectedId) => {
//     return entities[selectedId];
//   }
// );

export const getAll = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

// export const metaReducers: MetaReducer<ApplicationState>[] =
//   !environment.production ? [storeFreeze] : [];
