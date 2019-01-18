import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.usersService.currentUser$.subscribe(currentUser => {
      console.log(currentUser);
      this.currentUser = currentUser;
    });
  }
}
