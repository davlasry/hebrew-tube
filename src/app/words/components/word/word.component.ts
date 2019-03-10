import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsService } from 'src/app/core/services/words.service';
import { Store, select } from '@ngrx/store';
import { WordsState } from '../../state';
import { getVideosByID } from 'src/app/video/state/selectors/videos.selectors';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  word;
  wordId;
  videos;

  constructor(
    private wordsService: WordsService,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.wordId = this.route.snapshot.paramMap.get('id');
    this.getWord();
    this.getWordContext();
  }

  getWord(): void {
    // console.log(id);
    this.wordsService.getWord(this.wordId).subscribe(result => {
      console.log(result);
      this.word = result.data;
    });
  }

  // getWordContext() {
  //   this.wordsService.getWordContext(this.wordId).subscribe(result => {
  //     console.log(result);
  //     this.store
  //       .pipe(select(getVideoById, { id: result.data.id_video }))
  //       .subscribe(video => {
  //         this.video = video;
  //         console.log(video);
  //       });
  //   });
  // }

  getWordContext() {
    this.wordsService.getWordContext(this.wordId).subscribe(result => {
      console.log(result);
      result = result.data.map(context => context.id_video);
      this.store
        .pipe(select(getVideosByID, { ids: result }))
        .subscribe(videos => {
          if (videos[0]) {
            this.videos = videos;
            console.log(videos);
          }
        });
    });
  }
}
