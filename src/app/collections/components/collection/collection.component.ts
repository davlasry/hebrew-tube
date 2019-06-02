import { Component, OnInit } from '@angular/core';
import { CollectionsService } from 'src/app/core/services/collections.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { WordsState } from 'src/app/words/state';
import { Store, select } from '@ngrx/store';
import {
  DeleteCollection,
  RemoveWordFromCollection
} from 'src/app/words/state/actions/collections.actions';
import { getCollectionById } from 'src/app/words/state/selectors/collections.selectors';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  // collections;
  currentCollection$;
  newCollection;
  currentCollectionId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private collectionsService: CollectionsService,
    private store: Store<WordsState>
  ) {}

  ngOnInit() {
    this.route.params.pipe(map(params => params.id)).subscribe(collectionId => {
      // console.log('collectionId', collectionId);
      // this.collectionsService.getCollection(collectionId).subscribe(result => {
      //   // console.log('result', result);
      //   this.currentCollection = result.data;
      // });
      // console.log('collections:', this.collections[0]);
      // if (!collectionId) {
      //   this.router.navigateByUrl('/collections', this.collections[0]._id);
      // }

      this.currentCollection$ = this.store.pipe(
        select(getCollectionById(collectionId))
      );
      this.currentCollection$.subscribe(
        collection => (this.currentCollectionId = collection._id)
      );
    });
  }

  getCurrentLibrary() {}

  // onLibraryClick(library) {
  // this.currentLibrary = library;
  // this.router.navigateByUrl(`words/library/${library}`);
  // }

  onSaveCollection() {
    // console.log('new collection', this.newCollection);
    // this.createMode = false;
    this.collectionsService
      .createCollection({ name: this.newCollection })
      .subscribe(result => {
        // console.log(result);
      });
  }

  removeWordFromCollection(word) {
    console.log('remove word', word);
    this.store.dispatch(
      new RemoveWordFromCollection({
        collectionId: this.currentCollectionId,
        wordId: word._id
      })
    );
  }
}
