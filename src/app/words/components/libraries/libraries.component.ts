import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CollectionsService } from 'src/app/core/services/collections.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent implements OnInit {
  libraries;
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
      this.libraries = result['data'];
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
