import { WordsService } from './../../core/services/words.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { LOAD_WORDS, LoadWordsSuccess } from './words.actions';

@Injectable()
export class WordsEffects {
  constructor (
    private actions$: Actions,
    private wordsService: WordsService ) {
  }

  @Effect()
  getWords$ = this.actions$
    .ofType(LOAD_WORDS)
    .pipe(
      switchMap(() => {
        return this.wordsService.getWords().pipe(
          map(words => new LoadWordsSuccess(words)));
          // catchError(error => new LoadWordsFail(error));
      })
    );
}
