import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CollectionsService } from 'src/app/core/services/collections.service';
import { DeleteCollectionComponent } from 'src/app/shared/dialogs/delete-collection/delete-collection.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent implements OnInit {
  collections;
  currentLibrary;
  newCollection;
  createMode: Boolean;
  collectionPrivacy: String;

  privacies = [
    { value: 'private', viewValue: 'Private' },
    { value: 'public', viewValue: 'Public' }
  ];

  editedCollection;

  privacyOptions = [
    { value: 'public', viewValue: 'Public' },
    { value: 'private', viewValue: 'Private' }
  ];

  constructor(
    private router: Router,
    private collectionsService: CollectionsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createMode = false;

    this.getLibraryList();
  }

  getLibraryList() {
    this.collectionsService.getCollections().subscribe(result => {
      console.log(result);
      this.collections = result['data'];
    });
  }

  getCurrentLibrary() {}

  onClickDeleteCollection(collection) {
    console.log('DELETE COLLECTION COMPONENT');
    const dialogRef = this.dialog.open(DeleteCollectionComponent, {
      // width: '250px',
      data: { collection }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.collectionsService.deleteCollection(result).subscribe(result => {
        console.log(result);
        this.router.navigateByUrl('/collections');
      });
      // this.deleteFromMyWords.emit(result);
    });
  }

  onCreateCollection() {
    this.createMode = true;
  }

  onSaveCollection() {
    console.log('new collection', this.newCollection);
    this.createMode = false;
    this.collectionsService
      .createCollection({ name: this.newCollection })
      .subscribe(result => {
        this.newCollection = '';
        console.log(result);
      });
  }

  onClickEditCollection(collection) {
    this.editedCollection = collection;
  }

  onClickSaveEditCollection(newCollectionName, newCollectionPrivacy) {
    console.log('newCollectionName:', newCollectionName);
    this.editedCollection.name = newCollectionName;
    this.editedCollection.privacy = newCollectionPrivacy;
    console.log('this.collections:', this.collections);
    this.collectionsService
      .updateCollection(this.editedCollection)
      .subscribe(result => {
        console.log('result:', result);
        this.editedCollection = '';
      });
  }
}
