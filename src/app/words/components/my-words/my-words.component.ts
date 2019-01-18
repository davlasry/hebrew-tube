import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit {
  currentUserId;
  currentUserWords;

  dataSource;

  displayedColumns: string[] = ['hebrew', 'french', 'pronunciation', 'type'];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.currentUser$.subscribe(
      user => (this.currentUserId = user._id)
    );
    this.usersService.getWordsByUser(this.currentUserId).subscribe(words => {
      this.currentUserWords = words;
      this.dataSource = words;
      console.log(this.currentUserWords);
    });
  }
}
