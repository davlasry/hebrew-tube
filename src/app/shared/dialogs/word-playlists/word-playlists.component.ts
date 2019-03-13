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
import {
  AddToMyWords,
  DeleteFromMyWords
} from 'src/app/words/state/actions/myWords.actions';
import { map } from 'rxjs/operators';
import { getMyWordsIds } from 'src/app/words/state/selectors/myWords.selectors';
import { CollectionsService } from 'src/app/core/services/collections.service';

@Component({
  selector: 'app-word-playlists',
  templateUrl: './word-playlists.component.html',
  styleUrls: ['./word-playlists.component.scss']
})
export class WordPlaylistsDialogComponent implements OnInit {
  isWordFavorite$;
  createMode: Boolean;

  newCollection;

  playlistsForm: FormGroup;

  mockPlaylists = [
    {
      name: 'Musique'
    },
    {
      name: 'Documentaires'
    },
    {
      name: 'Trailers'
    }
  ];

  playlists: FormArray;

  constructor(
    public dialogRef: MatDialogRef<WordPlaylistsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private collectionsService: CollectionsService
  ) {
    this.createMode = false;
  }

  ngOnInit() {
    this.playlistsForm = this.formBuilder.group({
      playlists: this.formBuilder.array(this.initPlaylist())
    });

    console.log('this.playlistsForm', this.playlistsForm);

    // console.log(this.data);
    this.isWordFavorite$ = this.store.pipe(
      select(getMyWordsIds),
      map((myWords: string[]) => {
        console.log('getMyWordsIds', myWords);
        return myWords.indexOf(this.data.word._id) !== -1;
      })
      // distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );

    this.isWordFavorite$.subscribe(val => console.log(val));

    this.playlistsForm.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  get playlistsFormArray() {
    return this.playlistsForm.get('playlistsGroup') as FormArray;
  }

  initPlaylist() {
    const newMock = this.mockPlaylists.map(item => {
      return this.formBuilder.group({
        name: [item.name],
        value: [false]
      });
    });
    console.log('newMock', newMock);
    return newMock;
  }

  logForm() {
    console.log('this.playlistsForm', this.playlistsForm);
  }

  // createPlaylist(): void {
  //   const playlistsFormArray = this.playlistsForm.controls[
  //     'playlists'
  //   ] as FormArray;
  //   console.log('playlistsFormArray', playlistsFormArray);
  //   playlistsFormArray.push(this.initPlaylist());
  // }

  addToMyWords() {
    console.log('addToMyWords', this.data.word);
    this.data.word.id_word = this.data.word._id;
    this.store.dispatch(
      new AddToMyWords({ word: this.data.word, userId: this.data.userId })
    );
  }

  deleteFromMyWords() {
    console.log('deleteFromMyWords data', this.data);
    this.store.dispatch(
      new DeleteFromMyWords({
        wordID: this.data.word._id
        // userId: this.data.userId
      })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
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
      });
  }
}
