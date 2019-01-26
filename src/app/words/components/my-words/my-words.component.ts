import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Input,
  ViewChild
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWordsComponent implements OnInit, OnChanges {
  @Input() myWords;

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['hebrew', 'french', 'pronunciation', 'type'];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.myWords.length > 0) {
      this.dataSource = new MatTableDataSource(this.myWords);
      this.dataSource.sort = this.sort;
    }
  }
}
