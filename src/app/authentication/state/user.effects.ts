import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import {
  LOAD_USER,
  LoadUser,
  LOAD_USER_SUCCESS,
  LoadUserSuccess,
  LOGIN_REDIRECT,
  USER_SIGN_OUT,
  USER_SIGN_OUT_SUCCESS,
  SIGN_UP,
  SignUpSuccess,
  LoadUserFailure,
  LoginSuccess,
  LOGIN,
  LOGIN_SUCCESS,
  Login,
  LoginFailure,
  SignUp,
  CHECK_TOKEN,
  CheckTokenSuccess,
  CheckToken
} from './user.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Observable, of } from 'rxjs';
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
  checkToken$: Observable<any> = this.actions$.ofType(CHECK_TOKEN).pipe(
    switchMap((action: CheckToken) => {
      return this.jwtService.checkIfTokenValid().pipe(
        map(auth => {
          // console.log('getUserDetails', user);
          return new CheckTokenSuccess(auth);
        })
        // catchError(error => of(new LoadUserFailure({ error })))
      );
    })
  );

  @Effect()
  loadUser$: Observable<any> = this.actions$.ofType(LOAD_USER).pipe(
    map((action: LoadUser) => action.payload),
    switchMap(payload => {
      // console.log('LOAD USER EFFECT PAYLOAD', payload);
      return this.usersService.getUserDetails(payload).pipe(
        map(user => {
          return new LoadUserSuccess(user);
        }),
        catchError(error => of(new LoadUserFailure({ error })))
      );
    })
  );

  @Effect()
  logIn$: Observable<any> = this.actions$.ofType(LOGIN).pipe(
    map((action: Login) => action.payload),
    switchMap(payload => {
      console.log(payload);
      return this.usersService.logIn(payload).pipe(
        map(user => {
          console.log('user Login response', user);
          this.jwtService.saveToken(user.token);
          return new LoginSuccess(user);
        }),
        catchError(error => of(new LoginFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(LOGIN_SUCCESS),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  signIn$: Observable<any> = this.actions$.ofType(SIGN_UP).pipe(
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      // console.log(payload);
      return this.usersService.logIn(payload).pipe(
        map(user => {
          // console.log(user);
          this.jwtService.saveToken(user.token);
          return new SignUpSuccess(user);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(LOGIN_REDIRECT),
    tap(() => {
      this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  signOut$ = this.actions$.pipe(
    ofType(USER_SIGN_OUT),
    tap(() => {
      console.log('USER SIGN OUT EFFECT');
      this.jwtService.destroyToken();
      this.router.navigate(['/login']);
    })
  );
}
