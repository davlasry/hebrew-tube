import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Store, select } from '@ngrx/store';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { UserState } from 'src/app/authentication/state/user.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser;

  constructor(
    private usersService: UsersService,
    private store: Store<UserState>
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.store
      .pipe(select(getUser))
      .subscribe(user => (this.currentUser = user));
  }

  onClickSignout() {
    this.usersService.logOut();
  }
}
