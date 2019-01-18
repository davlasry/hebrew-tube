import { Component, OnInit } from '@angular/core';
import { JwtService } from './core/services/jwt.service';
import { UsersService } from './core/services/users.service';
import { ApplicationState } from './app-state';
import { Store, select } from '@ngrx/store';
import { LoadUser } from './authentication/state/user.actions';
import { take } from 'rxjs/operators';
import { getLoggedIn, getUser } from './authentication/state/user.selectors';
import { LoadWords } from './words/state/words.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private store: Store<ApplicationState>
  ) {}

  ngOnInit() {
    if (this.jwtService.getToken() && !this.jwtService.checkIfTokenExpired()) {
      this.usersService.setLoggedInValue(true);
    }

    // console.log(LoadWords);

    // console.log(LoadUser);

    this.store
      .pipe(select(getLoggedIn))
      .pipe(take(1))
      .subscribe(loggedIn => {
        console.log(loggedIn);
        if (!loggedIn) {
          this.store.dispatch(new LoadUser());
        }
      });
    this.store.pipe(select(getUser)).subscribe(user => console.log(user));

    this.usersService
      .getCurrentUserDetail()
      .subscribe(user => console.log(user));
  }
}
