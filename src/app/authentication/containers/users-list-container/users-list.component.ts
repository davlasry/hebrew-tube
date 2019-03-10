import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<any>;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users$ = this.usersService
      .getAllUsers()
      .pipe(map(result => result.data));
    this.users$.subscribe(result => console.log(result));
  }
}
