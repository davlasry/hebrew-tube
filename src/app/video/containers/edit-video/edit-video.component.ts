import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from 'src/app/core/services/videos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, map, filter } from 'rxjs/operators';
import { WordsService } from 'src/app/core/services/words.service';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';

import * as xml2js from 'xml2js';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  videoForm: FormGroup;
  video: any;

  selectedSubtitle = 0;

  filteredWords = [];

  wordsList;

  transcript;
  newSubtitle;

  types = [
    { value: 'nom', viewValue: 'nom' },
    { value: 'verbe', viewValue: 'verbe' },
    { value: 'pronom', viewValue: 'pronom' },
    { value: 'adjectif', viewValue: 'adjectif' },
    { value: 'adverbe', viewValue: 'adverbe' },
    { value: 'ponctuation', viewValue: 'ponctuation' }
  ];

  constructor(
    private fb: FormBuilder,
    private videosService: VideosService,
    private router: Router,
    private route: ActivatedRoute,
    private youtubeApiService: YoutubeApiService,
    private wordsService: WordsService // private store: Store<WordsState>
  ) {}

  ngOnInit() {
    this.getWords();

    this.getVideo();

    const decodeHTML = function(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };

    this.youtubeApiService.getVideoSubtitlesXML().subscribe(result => {
      // console.log(result);
      const decodedResult = decodeHTML(result);
      xml2js.Parser().parseString(decodedResult, (err, res) => {
        console.log(res);
        this.transcript = res.transcript.text;
        this.transformTranscript();
      });
    });
    // this.transcript = this.youtubeApiService.getVideoSubtitlesJson();
    // console.log(this.transcript);
  }

  transformTranscript() {
    // console.log('this.transcript', this.transcript);
    this.newSubtitle = this.transcript.map(subtitle => {
      // console.log('subtitle string', subtitle['_']);
      let words = subtitle['_'].split(' ');
      // console.log('words', words);
      words = words.map(word => {
        return { hebrew: word };
      });
      console.log('words', words);
      return {
        startTime: subtitle['$']['start'],
        endTime: subtitle['$']['start'] + subtitle['$']['dur'],
        words
      };
    });
    console.log('this.newSubtitle', this.newSubtitle);
  }

  get subtitlesForm(): FormArray {
    return this.videoForm.get('subtitles') as FormArray;
  }

  getSubtitleFormGroup(i) {
    return this.subtitlesForm['controls'][i];
  }

  getWordsFormArray(i): FormArray {
    return this.getSubtitleFormGroup(i)['controls']['words'] as FormArray;
  }

  getWordFormGroup(i, j): FormGroup {
    return this.getWordsFormArray(i)['controls'][j] as FormGroup;
  }

  getWords() {
    this.wordsService.getWords().subscribe(result => {
      this.wordsList = result['data'];
      console.log('getWords wordsList', this.wordsList);
    });
  }

  addAutocompletion(subtitleIndex, wordIndex) {
    if (!this.filteredWords[subtitleIndex]) {
      this.filteredWords[subtitleIndex] = [];
    }

    this.filteredWords[subtitleIndex].push(
      this.getWordFormGroup(subtitleIndex, wordIndex)['controls'][
        'hebrew'
      ].valueChanges.pipe(
        startWith(
          this.getWordFormGroup(subtitleIndex, wordIndex)['controls']['hebrew']
            .value
        ),
        map(word => {
          return word && word.length > 1 ? this._filterWords(word) : null;
        })
      )
    );
  }

  onAutocompleteSelect(selectedWord, wordIndex) {
    console.log(selectedWord, wordIndex);
    const foundWord = this.wordsList.find(word => {
      return word.hebrew === selectedWord;
    });
    console.log(foundWord);
    this.getWordFormGroup(this.selectedSubtitle, wordIndex)['controls'][
      'french'
    ].patchValue(foundWord.french);
    this.getWordFormGroup(this.selectedSubtitle, wordIndex)['controls'][
      'pronunciation'
    ].patchValue(foundWord.pronunciation);
  }

  deleteAutocompletion(i) {
    this.filteredWords.splice(i, 1);
  }

  private _filterWords(value): any[] {
    const filterValue = value.toLowerCase();

    if (this.wordsList) {
      return this.wordsList.filter(word => {
        return word.hebrew.toLowerCase().indexOf(filterValue) === 0;
      });
    }
  }

  getVideo(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.videosService.getVideo(id).subscribe(result => {
      console.log('getVideo videodata', result);
      this.video = result.data;
      this.initVideoForm();
      this.setWords();
    });
  }

  initVideoForm() {
    this.videoForm = this.fb.group({
      link: [this.video.link, [Validators.required]],
      createdAt: [this.video.createdAt],
      name: [this.video.name],
      subtitles: this.fb.array([]),
      _id: this.video._id
    });
  }

  initSubtitle() {
    return this.fb.group({
      words: this.fb.array([]),
      startTime: [''],
      endTime: ['']
    });
  }

  initWord() {
    return this.fb.group({
      hebrew: [''],
      french: [''],
      pronunciation: [''],
      type: ['']
    });
  }

  setWords() {
    // this.video.subtitles.forEach((subtitle, subtitleIndex) => {
    this.newSubtitle.forEach((subtitle, subtitleIndex) => {
      // console.log(subtitle);
      this.subtitlesForm.push(
        this.fb.group({
          words: this.fb.array([]),
          startTime: [subtitle.startTime],
          endTime: [subtitle.endTime]
        })
      );
      subtitle.words.forEach((word, wordIndex) => {
        // console.log(word, wordIndex);
        this.getWordsFormArray(subtitleIndex).push(
          this.fb.group({
            hebrew: [word.hebrew],
            french: [word.french || ''],
            pronunciation: [word.pronunciation || ''],
            type: [word.type || '']
          })
        );
        // console.log(subtitleIndex, wordIndex);
        // console.log(
        //   'this.getWordsFormArray',
        //   this.getWordsFormArray(subtitleIndex)
        // );
        this.addAutocompletion(subtitleIndex, wordIndex);
      });
    });
    // console.log(this.videoForm.value);
  }

  addSubtitle() {
    this.subtitlesForm.push(this.initSubtitle());
    this.addWord(this.subtitlesForm.length - 1);
  }

  addWord(i) {
    console.log(i);
    this.getWordsFormArray(i).push(this.initWord());
    console.log(this.getWordsFormArray(i)['controls'].length);
    this.addAutocompletion(i, this.getWordsFormArray(i)['controls'].length - 1);
  }

  deleteSubtitle(i) {
    this.subtitlesForm.removeAt(i);
  }

  deleteWord(i, j) {
    this.getWordsFormArray(i).removeAt(j);
  }

  onClickSubtitle(i) {
    this.selectedSubtitle = i;
    console.log(this.selectedSubtitle);
  }

  goPreviousSubtitle() {
    if (this.selectedSubtitle > 0) {
      this.selectedSubtitle--;
    }
  }

  goNextSubtitle() {
    if (this.selectedSubtitle < this.subtitlesForm.length) {
      this.selectedSubtitle++;
    }
  }

  moveWordDown(i, j) {
    const wordControl = this.subtitlesForm.at(i).get('words') as FormArray;
    const word = wordControl.controls[j];
    const filteredWord = this.filteredWords[i][j];
    wordControl.removeAt(j);
    this.filteredWords[i].splice(j, 1);
    wordControl.insert(j - 1, word);
    this.filteredWords[i].splice(j - 1, 0, filteredWord);
  }

  moveWordUp(i, j) {
    const wordControl = this.subtitlesForm.at(i).get('words') as FormArray;
    const word = wordControl.controls[j];
    const filteredWord = this.filteredWords[i][j];
    wordControl.removeAt(j);
    this.filteredWords[i].splice(j, 1);
    wordControl.insert(j + 1, word);
    this.filteredWords[i].splice(j + 1, 0, filteredWord);
  }

  resetForm() {}

  onSubmit() {
    // console.log(this.videoForm.get('youtubeLink'));
    this.videoForm.patchValue({
      lastEdit: Date.now()
    });
    console.log(this.videoForm.value);
    this.videosService.saveVideo(this.videoForm.value).subscribe(res => {
      console.log(res);
    });
    // this.store.dispatch(new AddWord(this.wordForm.value));
    // this.router.navigateByUrl('/videos');
  }
}
