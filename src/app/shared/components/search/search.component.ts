import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/core/services/words.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  searchWord(searchString) {
    this.router.navigateByUrl(`search/${searchString}`);
    // console.log('searchString:', searchString);
  }

  onKeyDown(event, searchString) {
    if (event.keyCode == 13) {
      this.searchWord(searchString);
    }
  }
}
