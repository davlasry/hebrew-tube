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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() currentUser: any;
  @Input() isLoggedIn: Boolean;
  @Input() isAdmin: Boolean;

  @Output() signOut = new EventEmitter();

  constructor(private usersService: UsersService) {
    this.isAdmin = false;
    this.isLoggedIn = false;
  }

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log(changes);
  }

  onClickSignout() {
    this.signOut.emit();
    this.usersService.logOut();
  }
}
