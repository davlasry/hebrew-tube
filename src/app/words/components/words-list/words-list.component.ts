import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsListComponent implements OnInit {
  @Input() words;
  @Input() myWords;
  @Output() deleteWords = new EventEmitter();
  @Output() deleteFromMyWords = new EventEmitter();
  @Output() addToMyWords = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onDeleteFromMyWords(word) {
    this.deleteFromMyWords.emit(word);
  }

  onAddToMyWords(word) {
    this.addToMyWords.emit(word);
  }

  checkIfWordInMyWords(wordId) {
    const myWordsIds = this.myWords.map(myWord => myWord._id);
    return myWordsIds.includes(wordId);
  }

  trackById(index, item) {
    return item._id;
  }
}
