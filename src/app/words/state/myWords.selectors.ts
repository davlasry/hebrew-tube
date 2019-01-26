import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyWordsState, selectAll, selectEntities } from './myWords.reducers';

export const getMyWordsState = createFeatureSelector<any>('myWords');

export const getMyWords = createSelector(
  getMyWordsState,
  selectAll
);
export const getMyWordsEntities = createSelector(
  getMyWordsState,
  selectEntities
);
export const getMyWordsLoading = createSelector(
  getMyWordsState,
  (state: MyWordsState) => state.myWordsLoading
);
export const getMyWordsLoaded = createSelector(
  getMyWordsState,
  (state: MyWordsState) => state.myWordsLoaded
);
// export const getWordById = (id: string) => {
//   createSelector(
//     getWordsEntities,
//     words => words[id]
//   );
// };

// export const isWordInMyWords = createSelector(getCollectionBookIds, , (ids, selected) => {
//   return ids.indexOf(selected) > -1;
// });
