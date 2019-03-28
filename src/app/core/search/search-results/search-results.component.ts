import { Component, OnInit } from '@angular/core';
import { WordsService } from '../../services/words.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  results = [];

  constructor(
    private wordsService: WordsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const searchString = params.get('string');
      this.searchWord(searchString);
    });
  }

  searchWord(searchString) {
    console.log('searchString:', searchString);
    this.wordsService.searchWord(searchString).subscribe(result => {
      console.log('result', result);
      this.results = result.data;
    });
  }
}
