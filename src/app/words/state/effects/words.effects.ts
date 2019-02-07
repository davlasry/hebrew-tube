import { WordsService } from '../../../core/services/words.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
  LOAD_WORDS,
  LoadWordsSuccess,
  ADD_WORD,
  AddWord,
  AddWordSuccess,
  DeleteWords,
  DELETE_WORDS,
  DELETE_WORD
} from '../actions/words.actions';
import { Observable } from 'rxjs';
import {
  DeleteFromMyWords,
  DeleteFromMyWordsSuccess
} from '../actions/myWords.actions';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions, private wordsService: WordsService) {}

  @Effect()
  getWords$ = this.actions$.ofType(LOAD_WORDS).pipe(
    switchMap(() => {
      // console.log('LOAD WORDS');
      return this.wordsService.getWords().pipe(
        map(words => {
          console.log(words);
          return new LoadWordsSuccess(words);
        })
      );

      // catchError(error => new LoadWordsFail(error));
    })
  );

  @Effect()
  addWord$ = this.actions$.ofType(ADD_WORD).pipe(
    switchMap((action: AddWord) => {
      // console.log(action.payload);
      return this.wordsService
        .addWord(action.payload)
        .pipe(map(word => new AddWordSuccess(word)));
      // catchError(error => new LoadWordsFail(error));
    })
  );

  // @Effect()
  // deleteWord$: Observable<any> = this.actions$.ofType(DELETE_WORD).pipe(
  //   switchMap((action: DeleteWords) => {
  //     // console.log(action.payload);
  //     return this.wordsService
  //       .deleteManyWords(action.payload)
  //       .pipe(map(words => new DeleteFromMyWords({ words })));
  //   })
  // );

  @Effect({ dispatch: false })
  deleteWords$: Observable<any> = this.actions$.ofType(DELETE_WORDS).pipe(
    switchMap((action: DeleteWords) => {
      // console.log(action.payload);
      return this.wordsService.deleteWord(action.payload);
    }),
    switchMap(res => [
      new DeleteFromMyWords(res)
      // new DeleteWordsFromMyWordsSuccess()
    ])
  );
}
