import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { Store, select } from '@ngrx/store';
import {
  UserSignOut,
  LoadUser,
  CheckToken
} from '../../authentication/state/user.actions';
import { take } from 'rxjs/operators';
import {
  getLoggedIn,
  getUser,
  isAdmin
} from '../../authentication/state/user.selectors';
import { Observable } from 'rxjs';
import { getWordsLoaded } from '../../words/state/selectors/words.selectors';
import { LoadWords } from '../../words/state/actions/words.actions';
import { LoadMyWords } from '../../words/state/actions/myWords.actions';
import { getMyWordsLoaded } from '../../words/state/reducers/myWords.reducers';
import { getIsVideosLoaded } from 'src/app/video/state/selectors/videos.selectors';
import { LoadVideos } from 'src/app/video/state/actions/videos.actions';
import { LoadMyVideos } from 'src/app/video/state/actions/myVideos.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser$: Observable<any>;
  isLoggedIn$: Observable<Boolean>;
  isAdmin$: Observable<Boolean>;

  currentUserId;

  constructor(private jwtService: JwtService, private store: Store<any>) {}

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(getUser));
    this.currentUser$.subscribe(currentUser => {
      // console.log('currentUser', currentUser);
      this.currentUserId = currentUser.id;
    });
    this.isLoggedIn$ = this.store.pipe(select(getLoggedIn));

    this.isAdmin$ = this.store.pipe(select(isAdmin));

    this.isAdmin$.subscribe((result: Boolean) => console.log(result));

    this.store.dispatch(new CheckToken());

    this.jwtService.checkIfTokenValid().subscribe(auth => {
      if (auth) {
        const userDetails = this.jwtService.decodedToken();
        // console.log(userDetails.id);
        this.store.dispatch(new LoadUser(userDetails.id));
      } else {
        this.store.dispatch(new UserSignOut());
      }
    });

    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.store.pipe(select(getWordsLoaded)).subscribe(hasLoaded => {
          if (!hasLoaded) {
            const payload = {
              sortOrder: 'asc',
              pageNumber: 0,
              pageSize: 0
            };
            this.store.dispatch(new LoadWords(payload));
          }
        });

        this.store.pipe(select(getMyWordsLoaded)).subscribe(hasLoaded => {
          if (!hasLoaded) {
            this.store.dispatch(new LoadMyWords(this.currentUserId));
          }
        });

        this.store.pipe(select(getIsVideosLoaded)).subscribe(hasLoaded => {
          // console.log(hasLoaded);
          if (!hasLoaded) {
            this.store.dispatch(new LoadVideos());
          }
        });

        this.store.pipe(select(getIsVideosLoaded)).subscribe(hasLoaded => {
          // console.log(hasLoaded);
          if (!hasLoaded) {
            this.store.dispatch(new LoadMyVideos(this.currentUserId));
          }
        });
      }
    });
  }

  signOut(): void {
    // console.log('SIGN OUT');
    this.jwtService.destroyToken();
    this.store.dispatch(new UserSignOut());
  }
}
