import { DataSource } from '@angular/cdk/table';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';

export class WordsDataSource extends DataSource<any> {


  constructor(
    private words$: Observable<any[]>,
    private sort: MatSort
    ) {
      super();
    }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    this.sort.sortChange.subscribe(sort => {
      console.log(sort);
    });
    return this.words$
      .pipe(map((val) => {
          return val;
        })
      );
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
