import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WordCollectionsDialogComponent } from 'src/app/shared/dialogs/word-collections/word-collections.component';
import { Store, select } from '@ngrx/store';
import { WordsState } from 'src/app/words/state';
import { EditWordDialogComponent } from 'src/app/shared/dialogs/edit-word-dialog/edit-word-dialog.component';
import { WordsService } from '../../services/words.service';
import { getVideosByID } from 'src/app/video/state/selectors/videos.selectors';
import { distinct, map, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() result;
  contexts;
  videos;

  constructor(
    public dialog: MatDialog,
    private store: Store<WordsState>,
    private wordsService: WordsService
  ) {}

  ngOnInit() {
    this.getWordContext();
  }

  onClickFavorite(event) {
    const dialogRef = this.dialog.open(WordCollectionsDialogComponent, {
      // width: '250px',
      data: { word: this.result }
    });
  }

  editWord() {
    // console.log('edit word', this.result);
    const dialogRef = this.dialog.open(EditWordDialogComponent, {
      // width: '250px',
      data: { word: this.result }
    });
  }

  getWordContext() {
    this.wordsService
      .getWordContext(this.result._id)
      .pipe(
        distinct(),
        pluck('data')
        // map((context: any) => context.id_video)
      )
      .subscribe((result: any) => {
        console.log('result:', result);
        this.contexts = result;
        // this.videos = result.map(context => context.id_video.name);
      });
    //   this.store
    //     .pipe(select(getVideosByID, { ids: result }))
    //     .subscribe(videos => {
    //       if (videos[0]) {
    //         this.videos = videos;
    //         console.log(videos);
    //       }
    //     });
    // });
  }
}
