import { Component, OnInit } from '@angular/core';
import { CollectionsService } from 'src/app/core/services/collections.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collections;
  currentCollection;
  newCollection;

  constructor(
    private route: ActivatedRoute,
    private collectionsService: CollectionsService
  ) {}

  ngOnInit() {
    this.route.params.pipe(map(params => params.id)).subscribe(collectionId => {
      console.log('collectionId', collectionId);
      this.collectionsService.getCollection(collectionId).subscribe(result => {
        console.log('result', result);
        this.currentCollection = result.data;
      });
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
}
