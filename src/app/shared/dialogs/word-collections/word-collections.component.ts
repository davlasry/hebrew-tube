import { Component, OnInit, Inject } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { CollectionsService } from 'src/app/core/services/collections.service';
import { getCollections } from 'src/app/words/state/selectors/collections.selectors';
import { AddWordToCollection } from 'src/app/words/state/actions/collections.actions';

@Component({
  selector: 'app-word-collections',
  templateUrl: './word-collections.component.html',
  styleUrls: ['./word-collections.component.scss']
})
export class WordCollectionsDialogComponent implements OnInit {
  isWordFavorite$;
  createMode: Boolean;

  newCollection;

  collectionsForm: FormGroup;

  collections: FormArray;

  constructor(
    public dialogRef: MatDialogRef<WordCollectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private collectionsService: CollectionsService
  ) {}

  ngOnInit() {
    this.collectionsForm = this.formBuilder.group({
      collections: this.formBuilder.array([])
    });

    this.createMode = false;

    console.log('this.playlistsForm', this.collectionsForm);

    this.getCollections();
  }

  get collectionsFormArray() {
    return this.collectionsForm.get('collections') as FormArray;
  }

  getCollections() {
    this.store.pipe(select(getCollections)).subscribe(collections => {
      this.addCollections(collections);
    });
  }

  addCollections(collections) {
    // console.log('addPlaylist playlists', playlists);
    if (collections) {
      for (const collection of collections) {
        this.collectionsFormArray.push(
          this.formBuilder.group({
            name: [collection.name],
            value: [collection.words.indexOf(this.data.word._id) !== -1],
            _id: [collection._id]
          })
        );
        // console.log('this.playlistsFormArray', this.playlistsFormArray);
      }
    } else {
      const collection = this.formBuilder.group({
        name: [''],
        value: [false]
      });
      this.collectionsFormArray.push(collection);
    }
  }

  onCheckboxClick(event, collectionId) {
    const value = event.checked;
    console.log(collectionId, value);
    console.log('this.data', this.data);
    if (value) {
      // add word to collection
      this.store.dispatch(
        new AddWordToCollection({ wordId: this.data.word._id, collectionId })
      );
      // this.collectionsService
      //   .addWordToCollection(collectionId, this.data.word._id)
      //   .subscribe(result => {
      //     console.log('updateCollection result', result);
      //   });
    } else {
      // remove word from collection
      this.collectionsService
        .deleteWordFromCollection(collectionId, this.data.word._id)
        .subscribe(result => {
          console.log('updateCollection result', result);
        });
    }
  }

  onCreateCollection() {
    this.createMode = true;
    this.newCollection = '';
  }

  onSaveCollection() {
    console.log('new collection', this.newCollection);
    this.createMode = false;
    this.collectionsService
      .createCollection({ name: this.newCollection })
      .subscribe(result => {
        console.log(result);
        this.addCollections([result.data]);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
