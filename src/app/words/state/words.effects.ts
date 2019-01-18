import { WordsService } from '../../core/services/words.service';
import { Injectable, OnInit } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import {
  LOAD_WORDS,
  LoadWordsSuccess,
  LOAD_MY_WORDS,
  LoadMyWordsSuccess
} from './words.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';

@Injectable()
export class WordsEffects {
  constructor(
    private actions$: Actions,
    private wordsService: WordsService,
    private usersService: UsersService
  ) {}

  @Effect()
  getWords$ = this.actions$.ofType(LOAD_WORDS).pipe(
    switchMap(() => {
      console.log('LOAD WORDS');
      return this.wordsService
        .getWords()
        .pipe(map(words => new LoadWordsSuccess(words)));
      // catchError(error => new LoadWordsFail(error));
    })
  );

  @Effect()
  getMyWords$ = this.actions$.ofType(LOAD_MY_WORDS).pipe(
    withLatestFrom(this.usersService.currentUser$, (action, currentUser) => {
      // console.log(currentUser);
      return currentUser;
    }),
    map(myWords => new LoadMyWordsSuccess(myWords))
    // switchMap(currentUser =>
    //   this.usersService
    //     .getWordsByUser(currentUser)
    //     .pipe(map(data => map(myWords => new LoadMyWordsSuccess(myWords))))
    // )
  );
}
