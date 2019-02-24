import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getLoggedIn } from 'src/app/authentication/state/user.selectors';
import {
  LoginRedirect,
  UserSignOut
} from 'src/app/authentication/state/user.actions';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>, private jwtService: JwtService) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getLoggedIn),
      map(loggedIn => {
        // console.log('AUTH GUARD loggedIn', loggedIn);
        // console.log(
        //   'AUTH GUARD checkIfTokenValud',
        //   this.jwtService.checkIfTokenValid()
        // );
        if (!loggedIn || !this.jwtService.checkIfTokenValid()) {
          this.store.dispatch(new UserSignOut());
          return false;
        }
        return true;
      })
    );
  }
}
