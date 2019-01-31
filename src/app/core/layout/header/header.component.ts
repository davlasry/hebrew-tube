import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Store, select } from '@ngrx/store';
import {
  getUser,
  getLoggedIn
} from 'src/app/authentication/state/user.selectors';
import { UserState } from 'src/app/authentication/state/user.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() currentUser: any;
  @Input() isLoggedIn: Boolean;

  @Output() signOut = new EventEmitter();

  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  ngOnChanges() {}

  onClickSignout() {
    this.signOut.emit();
    this.usersService.logOut();
  }
}
