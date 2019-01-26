import { WordsService } from '../../core/services/words.service';
import { Injectable, OnInit } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import {} from './words.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { LoadMyWordsSuccess, LOAD_MY_WORDS } from './myWords.actions';

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
}
