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

@Component({
  selector: 'app-word-collections',
  templateUrl: './word-collections.component.html',
  styleUrls: ['./word-collections.component.scss']
})
export class WordCollectionsDialogComponent implements OnInit {
  isWordFavorite$;
  createMode: Boolean;

  newCollection;

  playlistsForm: FormGroup;

  playlists: FormArray;

  constructor(
    public dialogRef: MatDialogRef<WordCollectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private collectionsService: CollectionsService
  ) {
    this.createMode = false;
  }

  ngOnInit() {
    this.playlistsForm = this.formBuilder.group({
      playlists: this.formBuilder.array([])
    });

    console.log('this.playlistsForm', this.playlistsForm);

    this.getCollections();
  }

  get playlistsFormArray() {
    return this.playlistsForm.get('playlists') as FormArray;
  }

  getCollections() {
    this.collectionsService.getCollections().subscribe(result => {
      console.log('getCollections result', result);
      this.addPlaylist(result['data']);
    });
  }

  addPlaylist(playlists) {
    // console.log('addPlaylist playlists', playlists);
    if (playlists) {
      for (const playlist of playlists) {
        this.playlistsFormArray.push(
          this.formBuilder.group({
            name: [playlist.name],
            value: [playlist.words.indexOf(this.data.word._id) !== -1],
            _id: [playlist._id]
          })
        );
        // console.log('this.playlistsFormArray', this.playlistsFormArray);
      }
    } else {
      const playlist = this.formBuilder.group({
        name: [''],
        value: [false]
      });
      this.playlistsFormArray.push(playlist);
    }
  }

  onCheckboxClick(event, collectionId) {
    const value = event.checked;
    console.log(collectionId, value);
    console.log('this.data', this.data);
    if (value) {
      // add word to collection
      this.collectionsService
        .addWordToCollection(collectionId, this.data.word._id)
        .subscribe(result => {
          console.log('updateCollection result', result);
        });
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
  }

  onSaveCollection() {
    console.log('new collection', this.newCollection);
    this.createMode = false;
    this.collectionsService
      .createCollection({ name: this.newCollection })
      .subscribe(result => {
        console.log(result);
        this.addPlaylist([result.data]);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
