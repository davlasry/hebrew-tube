import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordsService } from '../../services/words.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  results$;
  loading: Boolean = false;
  subscription: Subscription;

  constructor(
    private wordsService: WordsService,
    private route: ActivatedRoute
  ) {
    this.loading = false;
  }

  ngOnInit() {
    // console.log('this.loading:', this.loading);
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('params:', params);
      const searchString = params.get('string');
      this.searchWord(searchString);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchWord(searchString) {
    // console.log('searchString:', searchString);
    this.loading = true;
    this.results$ = this.wordsService.searchWord(searchString);
    this.subscription = this.results$.subscribe(results => {
      console.log('results:', results);
      if (results.data) {
        this.loading = false;
      }
    });
  }
}
