import { WordsService } from '../../../core/services/words.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import {
  LOAD_COLLECTIONS,
  LoadCollections,
  LoadCollectionsSuccess,
  LoadCollectionsFail,
  AddCollection,
  ADD_COLLECTION,
  AddCollectionSuccess,
  DELETE_COLLECTION,
  DeleteCollection,
  DeleteCollectionSuccess,
  EditCollection,
  EDIT_COLLECTION,
  EditCollectionSuccess
} from '../actions/collections.actions';
import { CollectionsService } from 'src/app/core/services/collections.service';

@Injectable()
export class CollectionsEffects {
  constructor(
    private actions$: Actions,
    private collectionsService: CollectionsService
  ) {}

  @Effect()
  getCollections$ = this.actions$.pipe(
    ofType(LOAD_COLLECTIONS),
    switchMap((action: LoadCollections) => {
      // console.log('LOAD COLLECTIONS EFFECT', action);
      return this.collectionsService.getCollections().pipe(
        map((collections: any) => {
          // console.log('collections:', collections);
          return new LoadCollectionsSuccess(collections.data);
        }),
        catchError(error => of(new LoadCollectionsFail(error)))
      );
    })
  );

  @Effect()
  addCollection$ = this.actions$.pipe(
    ofType(ADD_COLLECTION),
    switchMap((action: AddCollection) => {
      // console.log('ADD COLLECTION EFFECT', action.payload);
      return this.collectionsService.createCollection(action.payload).pipe(
        map(word => new AddCollectionSuccess(word))
        // catchError(error => new LoadWordsFail(error))
      );
    })
  );

  @Effect()
  deleteCollection$: Observable<any> = this.actions$.pipe(
    ofType(DELETE_COLLECTION),
    switchMap((action: DeleteCollection) => {
      // console.log('DELETE COLLECTION EFFECT', action.payload);
      return this.collectionsService
        .deleteCollection(action.payload._id)
        .pipe(map(res => new DeleteCollectionSuccess(res.wordID)));
    })
  );

  @Effect()
  editCollection$: Observable<any> = this.actions$.pipe(
    ofType(EDIT_COLLECTION),
    switchMap((action: EditCollection) => {
      // console.log('EDIT COLLECTION EFFECT', action.payload);
      return this.collectionsService.updateCollection(action.payload).pipe(
        map(res => {
          // console.log('res editCollection EFFECT', res.data);
          return new EditCollectionSuccess(res.data);
        })
      );
    })
  );
}
