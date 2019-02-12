import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { UsersService } from '../services/users.service';
import { ApplicationState } from '../../app-state';
import { Store, select } from '@ngrx/store';
import {
  LoadUserSuccess,
  UserSignOut
} from '../../authentication/state/user.actions';
import { take } from 'rxjs/operators';
import {
  getLoggedIn,
  getUser
} from '../../authentication/state/user.selectors';
import { Observable } from 'rxjs';
import { getWordsLoaded } from '../../words/state/selectors/words.selectors';
import { LoadWords } from '../../words/state/actions/words.actions';
import { LoadMyWords } from '../../words/state/actions/myWords.actions';
import { getMyWordsLoaded } from '../../words/state/reducers/myWords.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser$: Observable<any>;
  isLoggedIn$: Observable<Boolean>;

  currentUserId;

  constructor(private jwtService: JwtService, private store: Store<any>) {}

  ngOnInit() {
    this.currentUser$ = this.store.select(getUser);
    this.currentUser$.subscribe(currentUser => {
      console.log('currentUser', currentUser);
      this.currentUserId = currentUser.id;
    });
    this.isLoggedIn$ = this.store.select(getLoggedIn);

    if (this.jwtService.getToken() && !this.jwtService.checkIfTokenExpired()) {
      const userDetails = this.jwtService.decodeToken(
        this.jwtService.getToken()
      );
      // console.log(this.jwtService.decodeToken(this.jwtService.getToken()));
      this.store.dispatch(new LoadUserSuccess(userDetails));
    }

    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.store.pipe(select(getWordsLoaded)).subscribe(hasLoaded => {
          if (!hasLoaded) {
            this.store.dispatch(new LoadWords());
          }
        });

        this.store.pipe(select(getMyWordsLoaded)).subscribe(hasLoaded => {
          if (!hasLoaded) {
            this.store.dispatch(new LoadMyWords(this.currentUserId));
          }
        });
      }
    });
  }

  signOut(): void {
    console.log('SIGN OUT');
    this.jwtService.destroyToken();
    this.store.dispatch(new UserSignOut());
  }
}
