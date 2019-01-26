import { Injectable, OnInit } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import {} from './words.actions';
import { UsersService } from 'src/app/core/services/users.service';
import {
  LoadMyWordsSuccess,
  LOAD_MY_WORDS,
  ADD_TO_MY_WORDS,
  DELETE_FROM_MY_WORDS,
  AddToMyWords,
  DeleteFromMyWords,
  AddToMyWordsSuccess,
  DeleteFromMyWordsSuccess
} from './myWords.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class MyWordsEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  @Effect()
  getMyWords$ = this.actions$.ofType(LOAD_MY_WORDS).pipe(
    switchMap((action: LoadMyWordsSuccess) => {
      return this.usersService.getWordsByUser(action.payload).pipe(
        map(myWords => {
          return new LoadMyWordsSuccess(myWords);
        })
      );
    })
  );

  @Effect()
  addToMyWords$: Observable<any> = this.actions$.ofType(ADD_TO_MY_WORDS).pipe(
    switchMap((action: AddToMyWords) => {
      const payload = action.payload;
      // console.log(action.payload);
      return this.usersService.addToMyWords(payload).pipe(
        map(myWords => {
          return new AddToMyWordsSuccess(myWords);
        })
      );
    })
  );

  @Effect()
  deleteFromMyWords$: Observable<any> = this.actions$
    .ofType(DELETE_FROM_MY_WORDS)
    .pipe(
      switchMap((action: DeleteFromMyWords) => {
        const payload = action.payload;
        console.log(payload);
        return this.usersService.deleteFromMyWords(payload).pipe(
          map(myWords => {
            return new DeleteFromMyWordsSuccess(myWords);
          })
        );
      })
    );
}
