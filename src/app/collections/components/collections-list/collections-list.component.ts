import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CollectionsService } from 'src/app/core/services/collections.service';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent implements OnInit {
  collections;
  currentLibrary;
  newCollection;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionsService: CollectionsService
  ) {}

  ngOnInit() {
    this.route.params.pipe(map(params => params.id)).subscribe(libraryId => {
      console.log('libraryId', libraryId);
      this.currentLibrary = libraryId;
    });

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
