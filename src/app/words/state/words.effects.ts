import { WordsService } from '../../core/services/words.service';
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
  DELETE_WORDS
} from './words.actions';
import { Observable } from 'rxjs';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions, private wordsService: WordsService) {}

  @Effect()
  getWords$ = this.actions$.ofType(LOAD_WORDS).pipe(
    switchMap(() => {
      // console.log('LOAD WORDS');
      return this.wordsService
        .getWords()
        .pipe(map(words => new LoadWordsSuccess(words)));
      // catchError(error => new LoadWordsFail(error));
    })
  );

  @Effect()
  addWord$ = this.actions$.ofType(ADD_WORD).pipe(
    switchMap((action: AddWord) => {
      console.log(action.payload);
      return this.wordsService
        .addWord(action.payload)
        .pipe(map(word => new AddWordSuccess(word)));
      // catchError(error => new LoadWordsFail(error));
    })
  );

  @Effect({ dispatch: false })
  deleteWords$: Observable<any> = this.actions$.ofType(DELETE_WORDS).pipe(
    switchMap((action: DeleteWords) => {
      console.log(action.payload);
      return this.wordsService.deleteManyWords(action.payload);
      // .pipe(
      //   map(wordsIds => {
      //     console.log(wordsIds);
      //     return new DeleteWordsSuccess(wordsIds);
      //   })
      // );
    })
  );
}
