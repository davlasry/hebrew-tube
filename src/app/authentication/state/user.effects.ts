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
  getUser$ = this.actions$
    .ofType(LOAD_USER)
    .pipe(mapTo(new LoadUserSuccess(this.jwtService.currentUser)));
}
