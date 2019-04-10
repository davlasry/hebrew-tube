import { Injectable, OnInit } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

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
} from '../actions/myWords.actions';
import { Observable } from 'rxjs';

@Injectable()
export class MyWordsEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  @Effect()
  getMyWords$ = this.actions$.pipe(
    ofType(LOAD_MY_WORDS),
    switchMap((action: LoadMyWordsSuccess) => {
      // console.log('GET MY WORDS EFFECT', action.payload);
      return this.usersService.getWordsByUser(action.payload).pipe(
        map(myWords => {
          return new LoadMyWordsSuccess(myWords.data);
        })
      );
    })
  );

  @Effect()
  addToMyWords$: Observable<any> = this.actions$.pipe(
    ofType(ADD_TO_MY_WORDS),
    switchMap((action: AddToMyWords) => {
      const payload = action.payload;
      // console.log('ADD TO MY WORDS EFFECT', action.payload);
      return this.usersService.addToMyWords(payload.word).pipe(
        map(myWords => {
          return new AddToMyWordsSuccess(myWords);
        })
      );
    })
  );

  @Effect()
  deleteFromMyWords$: Observable<any> = this.actions$.pipe(
    ofType(DELETE_FROM_MY_WORDS),
    switchMap((action: DeleteFromMyWords) => {
      const payload = action.payload;
      console.log('DELETE FROM MY WORDS EFFECT', action.payload);
      return this.usersService.deleteFromMyWords(payload.wordID).pipe(
        map(res => {
          console.log(res);
          return new DeleteFromMyWordsSuccess(res.wordID);
        })
      );
    })
  );
}
