import { Component, OnInit } from '@angular/core';
import { JwtService } from './core/services/jwt.service';
import { UsersService } from './core/services/users.service';
import { ApplicationState } from './app-state';
import { Store, select } from '@ngrx/store';
import {
  LoadUser,
  LoadUserSuccess,
  UserSignOut
} from './authentication/state/user.actions';
import { take } from 'rxjs/operators';
import { getLoggedIn, getUser } from './authentication/state/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser$: Observable<any>;
  isLoggedIn$: Observable<Boolean>;

  constructor(
    private jwtService: JwtService,
    private store: Store<ApplicationState>
  ) {}

  ngOnInit() {
    this.currentUser$ = this.store.select(getUser);
    this.isLoggedIn$ = this.store.select(getLoggedIn);

    if (this.jwtService.getToken() && !this.jwtService.checkIfTokenExpired()) {
      const userDetails = this.jwtService.decodeToken(
        this.jwtService.getToken()
      );
      // console.log(this.jwtService.decodeToken(this.jwtService.getToken()));
      this.store.dispatch(new LoadUserSuccess(userDetails));
    }
  }

  signOut(): void {
    console.log('SIGN OUT');
    this.jwtService.destroyToken();
    this.store.dispatch(new UserSignOut());
  }
}
