import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { WordsService } from '../../core/services/words.service';
import { YoutubePlayerService } from 'src/app/core/services/youtube-player.service';
import { interval } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent implements OnInit, OnChanges, OnDestroy {
  wordForm: FormGroup;

  isMorfixLoading: Boolean;

  @Input() isPlayerReady: Boolean;
  @Input() session;

  timer = interval(1000);
  currentTime = 0;

  morfixHebrew;
  morfixEnglish;

  subscribtions = [];

  constructor(
    private fb: FormBuilder,
    private wordsService: WordsService,
    private youtubePlayer: YoutubePlayerService
  ) {}

  ngOnInit() {
    this.wordForm = this.fb.group({
      hebrew: ['', [Validators.required, Validators.pattern(/^[א-ת\s]+$/)]],
      french: [''],
      english: [''],
      phonetic: [''],
      notes: [''],
      location: ['']
    });

    this.youtubePlayer.youtubePlayerState$.subscribe(state => {
      console.log(`State: ${state}`);
      switch (state) {
        // -1 (unstarted)
        case -1:
          break;
        // 0 (ended)
        case 0:
          break;
        // 1 (playing)
        case 1:
          this.subscribtions.push(
            this.timer.subscribe(time => {
              if (this.youtubePlayer.yt_player) {
                this.currentTime = this.youtubePlayer.getCurrentTime();
                if (this.session.words.length > 0) {
                  this.checkWordPlayed();
                }
                this.wordForm.get('location').setValue(this.currentTime);
              }
            })
          );
          break;
        // 2 (paused)
        case 2:
          this.currentTime = this.youtubePlayer.getCurrentTime();
          this.wordForm.get('location').setValue(this.currentTime);
          this.subscribtions.forEach(subscribtion =>
            subscribtion.unsubscribe()
          );
          break;
        // 3 (buffering)
        case 3:
          break;
        // 5 (video cued)
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // if (this.session && changes.session) {
    //   this.wordsService.getSessionWords(this.session._id)
    //   .pipe(distinctUntilChanged())
    //   .subscribe(words => {
    //     console.log(words);
    //     words ? this.session.words = words : this.session.words = [];
    //   });
    // }
  }

  ngOnDestroy() {
    console.log('disctionaries destoroy');
    this.subscribtions.forEach(subscribtion => subscribtion.unsubscribe());
    this.youtubePlayer.destroyPlayer();
  }

  addWord() {
    const req = {
      hebrew: '',
      definitions: []
    };
    req['hebrew'] = this.wordForm.value.hebrew;
    // console.log(req);
    req.definitions.push({
      english: this.wordForm.value.english,
      french: this.wordForm.value.french,
      phonetic: this.wordForm.value.phonetic,
      notes: this.wordForm.value.notes,
      sessions: [
        {
          location: this.wordForm.value.location,
          session: this.session._id
        }
      ]
    });
    this.session.words.push(req);
    this.wordsService.addWord(req).subscribe(res => {
      console.log(res);
      this.wordForm.reset();
    });
  }

  // onSearch() {
  //   console.log(this.wordForm.value);
  //   this.isMorfixLoading = true;
  //   this.wordsService.searchWord(this.wordForm.value.hebrew).subscribe(res => {
  //     console.log(res);
  //     const result = Object.values(JSON.parse(res));
  //     console.log(result);
  //     this.morfixHebrew = result[0];
  //     this.morfixEnglish = result[1];
  //     this.isMorfixLoading = false;
  //   });
  // }

  addEnglish(english) {
    this.wordForm.controls['english'].patchValue(english);
  }

  checkWordPlayed() {
    this.session.words = this.session.words.map(word => {
      const wordLocation = parseFloat(word.definitions[0].sessions[0].location);
      console.log(this.currentTime);
      if (
        wordLocation <= this.currentTime + 3 &&
        wordLocation >= this.currentTime - 3
      ) {
        console.log(word.hebrew, wordLocation);
        word['isActive'] = true;
      } else {
        word['isActive'] = false;
      }
      return word;
    });
  }
}
