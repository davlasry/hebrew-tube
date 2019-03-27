import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddNewUserComponent } from 'src/app/shared/dialogs/add-new-user/add-new-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<any>;

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit() {
    this.users$ = this.usersService
      .getAllUsers()
      .pipe(map(result => result.data));
    this.users$.subscribe(result => console.log(result));
  }

  addUser() {
    console.log('ADD USER COMPONENT');
    const dialogRef = this.dialog.open(AddNewUserComponent, {
      // width: '250px',
      // data: { collection }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // this.collectionsService.deleteCollection(result).subscribe(result => {
      //   console.log(result);
      //   this.router.navigateByUrl('/collections');
      // });
      // this.deleteFromMyWords.emit(result);
    });
  }
}
