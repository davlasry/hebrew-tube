import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import { WordsService } from 'src/app/core/services/words.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewChecked {
  searchText: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // console.log('this.route:', this.route);
    // console.log('this.router:', this.router);

    this.router.events.subscribe(event => {
      if (this.route.firstChild) {
        // this.route.firstChild.params.subscribe(params => {
        //   console.log('params:', params);
        //   const searchString = params.get('string');
        //   console.log('searchString:', searchString);
        // });
        if (this.router.url.indexOf('search/') === -1) {
          this.searchText = '';
        } else {
          this.searchText = this.route.firstChild.snapshot.params.string;
        }
      }
    });
  }

  ngAfterViewChecked() {}

  searchWord(searchString) {
    this.router.navigateByUrl(`search/${searchString}`);
    // console.log('searchString:', searchString);
  }

  onKeyDown(event, searchString) {
    if (event.keyCode === 13) {
      this.searchWord(searchString);
    }
  }
}
