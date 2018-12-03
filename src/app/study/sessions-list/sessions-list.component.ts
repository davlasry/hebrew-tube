import { SessionsService } from './../../core/services/sessions.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteSessionDialogComponent } from 'src/app/shared/dialogs/delete-session-dialog/delete-session-dialog.component';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})
export class SessionsListComponent implements OnInit {

  sessions;

  constructor(
    private sessionsService: SessionsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sessionsService.getSessions().subscribe(res => {
      this.sessions = res;
    });
  }

  onDeleteSession(session) {
    console.log(session);
    const dialogRef = this.dialog.open(DeleteSessionDialogComponent, {
      // width: '250px',
      data: {session}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 1) {
        this.sessions = this.sessions.filter(e => {
              return e._id !== session._id;
        });
      }
      console.log(result);
    });
  }

}
