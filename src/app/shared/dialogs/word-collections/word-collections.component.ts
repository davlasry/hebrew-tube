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
import {
  getCollections,
  getCollectionsLoaded
} from 'src/app/words/state/selectors/collections.selectors';
import {
  AddWordToCollection,
  RemoveWordFromCollection,
  AddCollection
} from 'src/app/words/state/actions/collections.actions';
import { first } from 'rxjs/operators';

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
    this.store
      .pipe(
        select(getCollections),
        first()
      )
      .subscribe(collections => {
        console.log('collections:', collections);
        this.addCollections(collections);
      });
  }

  addCollections(collections) {
    console.log('addCollections collections', collections);
    if (collections) {
      for (const collection of collections) {
        console.log('collection:', collection);
        const wordsIds = collection.words.map(word => word._id);
        console.log('wordsIds:', wordsIds);
        this.collectionsFormArray.push(
          this.formBuilder.group({
            name: [collection.name],
            value: [wordsIds.indexOf(this.data.word._id) !== -1],
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
        new AddWordToCollection({ word: this.data.word, collectionId })
      );
    } else {
      // remove word from collection
      this.store.dispatch(
        new RemoveWordFromCollection({
          wordId: this.data.word._id,
          collectionId
        })
      );
    }
  }

  onCreateCollection() {
    this.createMode = true;
    this.newCollection = '';
  }

  onSaveCollection() {
    console.log('new collection', { name: this.newCollection });
    this.createMode = false;
    this.store.dispatch(new AddCollection({ name: this.newCollection }));
    // TODO - ADD COLLECTION AFTER ADD COLLECTION SUCCESS
    // [find a way to wait until success, maybe only subscribe to the result but
    // then will take time to update the list in the dialog]...
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
