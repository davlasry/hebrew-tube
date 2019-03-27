import { Component, OnInit } from '@angular/core';
import { CollectionsService } from 'src/app/core/services/collections.service';
import { Router, ActivatedRoute } from '@angular/router/src';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-collections-list-container',
  templateUrl: './collections-list-container.component.html',
  styleUrls: ['./collections-list-container.component.scss']
})
export class CollectionsListContainerComponent implements OnInit {
  collections;
  currentLibrary;
  newCollection;

  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    private collectionsService: CollectionsService
  ) {}

  ngOnInit() {
    // this.route.params.pipe(map(params => params.id)).subscribe(libraryId => {
    //   console.log('libraryId', libraryId);
    //   this.currentLibrary = libraryId;
    // });

    this.getLibraryList();
  }

  getLibraryList() {
    this.collectionsService.getCollections().subscribe(result => {
      console.log(result);
      this.collections = result['data'];
    });
  }

  getCurrentLibrary() {}

  // onLibraryClick(library) {
  // this.currentLibrary = library;
  // this.router.navigateByUrl(`words/library/${library}`);
  // }

  onSaveCollection() {
    console.log('new collection', this.newCollection);
    // this.createMode = false;
    this.collectionsService
      .createCollection({ name: this.newCollection })
      .subscribe(result => {
        console.log(result);
      });
  }
}
