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
  DELETE_WORD,
  LoadWordsFail,
  LOAD_WORDS_FAIL
} from '../actions/words.actions';
import { Observable, of } from 'rxjs';
import {
  DeleteFromMyWords,
  DeleteFromMyWordsSuccess
} from '../actions/myWords.actions';
import { UserSignOut } from 'src/app/authentication/state/user.actions';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions, private wordsService: WordsService) {}

  @Effect()
  getWords$ = this.actions$.ofType(LOAD_WORDS).pipe(
    switchMap(() => {
      // console.log('LOAD WORDS');
      return this.wordsService.getWords().pipe(
        map((words: any) => new LoadWordsSuccess(words.data)),
        catchError(error => of(new LoadWordsFail(error)))
      );
    })
  );

  @Effect()
  getWordsFail$ = this.actions$.ofType(LOAD_WORDS_FAIL).pipe(
    switchMap(() => {
      console.log('LOAD WORDS FAIL');
      return this.wordsService.getWords().pipe(
        map(() => new UserSignOut())
        // catchError(error => of(new LoadWordsFail(error)))
      );
    })
  );

  @Effect()
  addWord$ = this.actions$.ofType(ADD_WORD).pipe(
    switchMap((action: AddWord) => {
      console.log('ADD WORD EFFECT', action.payload);
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
