import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  mapTo
} from 'rxjs/operators';

import {
  LOAD_USER,
  LoadUser,
  LOAD_USER_SUCCESS,
  LoadUserSuccess
} from './user.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Effect()
  getUser$ = this.actions$.ofType(LOAD_USER).pipe(
    mapTo(new LoadUserSuccess(this.jwtService.currentUser))
    // switchMap(() => {
    //   console.log('effect');
    //   return this.jwtService.currentUser.pipe(
    //     map(user => {
    //       console.log(user);
    //       return new LoadUserSuccess(user);
    //     })
    //   );
    //   // catchError(error => new LoadWordsFail(error));
    // })
  );

  // @Effect()
  // getMyWords$ = this.actions$.ofType(LOAD_MY_WORDS).pipe(
  //   withLatestFrom(this.usersService.currentUser$, (action, currentUser) => {
  //     console.log(currentUser);
  //     return currentUser;
  //   }),
  //   map(myWords => new LoadMyWordsSuccess(myWords))
  // );
}
