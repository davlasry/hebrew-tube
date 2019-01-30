import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsService } from 'src/app/core/services/words.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  word;

  constructor(
    private wordsService: WordsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getWord();
  }

  getWord(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.wordsService.getWord(id).subscribe(result => {
      this.word = result;
      // console.log(result);
    });
  }
}
