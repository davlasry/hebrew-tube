import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  mapTo,
  tap
} from 'rxjs/operators';

import {
  LOAD_USER,
  LoadUser,
  LOAD_USER_SUCCESS,
  LoadUserSuccess,
  LOGIN_REDIRECT,
  USER_SIGN_OUT,
  USER_SIGN_OUT_SUCCESS
} from './user.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  @Effect()
  logIn$: Observable<any> = this.actions$.ofType(LOAD_USER).pipe(
    map((action: LoadUser) => action.payload),
    switchMap(payload => {
      // console.log(payload);
      return this.usersService.logIn(payload).pipe(
        map(user => {
          // console.log(user);
          this.jwtService.saveToken(user.token);
          return new LoadUserSuccess(user);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(LOAD_USER_SUCCESS)
    // tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(LOGIN_REDIRECT),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  signOut$ = this.actions$.pipe(
    ofType(USER_SIGN_OUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
}
