import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from 'src/app/core/services/videos.service';
import { ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { WordsService } from 'src/app/core/services/words.service';

import * as Subtitle from 'subtitle';

import * as jsondiffpatch from 'jsondiffpatch';

import { Store, select } from '@ngrx/store';
import { getAllWords } from 'src/app/words/state/selectors/words.selectors';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  videoForm: FormGroup;
  video: any;
  videoClone: any;

  convertSubtitles = false;

  selectedSubtitle = 0;

  filteredWords = [];

  wordsList;

  transcript;
  newSubtitle;
  captions = [];

  finalResult;

  srtCopy;

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
    private route: ActivatedRoute,
    private store: Store<any>,
    private wordsService: WordsService // private store: Store<WordsState>
  ) {}

  ngOnInit() {
    this.getWords();
  }

  convertSrt() {
    // console.log(this.srtCopy);
    // console.log(Subtitle.parse(this.srtCopy));
    let parsedSrt = Subtitle.parse(this.srtCopy);
    parsedSrt = parsedSrt.map(subtitle => {
      // console.log(subtitle);
      let words = subtitle.text
        .replace(/(?:\r\n|\r|\n)/g, ' ')
        .replace('"', '"')
        .match(
          /[a-z\u0590-\u05fe]+(?:'[a-z\u0590-\u05fe]+)*|[!?.,'";:/-/](?![!?.,'";:/-/])/g
        );
      // console.log(words);
      words = words.map(word => {
        return { hebrew: word, french: '', pronunciation: '', type: '' };
      });
      // console.log(words);
      return {
        startTime: subtitle.start / 1000,
        endTime: subtitle.end / 1000,
        words
      };
    });
    console.log(parsedSrt);
    this.finalResult = parsedSrt;
    console.log('this.finalResult', this.finalResult);
    this.setWords(this.finalResult);
    this.convertSubtitles = false;
  }

  timeToSeconds(time) {
    console.log(time);
    const timeArray = time.split(':');
    return +timeArray[0] * 60 * 60 + +timeArray[1] * 60 + +timeArray[2];
  }

  // decodeHTML = html => {
  //   const txt = document.createElement('textarea');
  //   txt.innerHTML = html;
  //   console.log('txt decodeHTML', txt);
  //   return txt.value;
  // };

  // transformTranscript() {
  //   // console.log('this.transcript', this.transcript);
  //   this.newSubtitle = this.transcript.map(subtitle => {
  //     // console.log('subtitle string', subtitle['_']);
  //     let words = subtitle['_'].split(' ');
  //     // console.log('words', words);
  //     words = words.map(word => {
  //       word = word.replace('\n', ' ').replace('"', '');
  //       return { hebrew: word, french: '', pronunciation: '', type: '' };
  //     });
  //     // console.log('words', words);
  //     return {
  //       startTime: subtitle['$']['start'],
  //       endTime: subtitle['$']['start'] + subtitle['$']['dur'],
  //       words
  //     };
  //   });
  //   console.log('this.newSubtitle', this.newSubtitle);
  // }

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
    this.store.pipe(select(getAllWords)).subscribe(words => {
      this.wordsList = words;
      console.log('this.wordsList', this.wordsList);
      this.getVideo();
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
      // console.log('getVideo videodata', result);
      this.video = result.data;
      this.videoClone = { ...this.video };
      this.initVideoForm();
      this.setWords(this.video.subtitles);
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

  setWords(videoData) {
    console.log('videoData', videoData);
    while (this.subtitlesForm.length !== 0) {
      this.subtitlesForm.removeAt(0);
    }
    // this.video.subtitles.forEach((subtitle, subtitleIndex) => {
    videoData.forEach((subtitle, subtitleIndex) => {
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
        const foundWord = this.wordsList.find(existingWord => {
          return existingWord.hebrew === word.hebrew;
        });
        // console.log(foundWord);
        if (foundWord) {
          word.french = foundWord.french;
          word.pronunciation = foundWord.pronunciation;
          word.type = foundWord.type;
        }
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

  resetForm() {
    this.videoForm.reset();
  }

  onSubmit() {
    // this.getDiff();

    console.log('this.videoForm.value', this.videoForm.value);

    this.videoForm.value.subtitles.forEach((subtitle, index) => {
      // const subtitleClone = this.videoClone.subtitles[index];
      // console.log('subtitleClone:', subtitleClone);
      // if (subtitle.startTime != subtitleClone.startTime) {
      //   console.log('Different startTime');
      // } else if (subtitle.startTime != subtitleClone.startTime) {
      //   console.log('Different endTime');
      // } else {
      //   console.log('everything is unchanged');
      // }
      // subtitleClone.words = subtitleClone.words.map(word => {
      //   return {
      //     hebrew: word.hebrew,
      //     french: word.french,
      //     pronunciation: word.pronunciation,
      //     type: word.type
      //   };
      // });
      // if (
      //   JSON.stringify(subtitle.words) !== JSON.stringify(subtitleClone.words)
      // ) {
      //   console.log('Words were changed');
      // } else {
      //   console.log('Words are identical');
      // }
    });

    // this.videoForm

    this.videosService.saveVideo(this.videoForm.value).subscribe(res => {
      console.log(res);
    });

    // this.store.dispatch(new AddWord(this.wordForm.value));
    // this.router.navigateByUrl('/videos');
  }

  getDiff() {
    var left = { a: 3, b: 4 };
    var right = { a: 3, c: 9 };
    var delta = jsondiffpatch.diff(left, right);
    console.log('delta:', delta);
  }
}
