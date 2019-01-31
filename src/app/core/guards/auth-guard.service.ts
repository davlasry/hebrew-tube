import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getLoggedIn } from 'src/app/authentication/state/user.selectors';
import { LoginRedirect } from 'src/app/authentication/state/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getLoggedIn),
      map(loggedIn => {
        console.log(loggedIn);
        if (!loggedIn) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }
        return true;
      })
    );
  }
}
