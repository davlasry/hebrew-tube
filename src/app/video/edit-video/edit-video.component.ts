import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from 'src/app/core/services/videos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  videoForm: FormGroup;
  video: any;

  constructor(
    private fb: FormBuilder,
    private videosService: VideosService,
    private router: Router,
    private route: ActivatedRoute,
    // private store: Store<WordsState>
  ) { }

  ngOnInit() {
    this.getVideo();
  }

  getVideo(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.videosService.getVideo(id).subscribe(result => {
      console.log(result);
      this.video = result;
      this.initVideoForm();
      // console.log(this.video.subtitles);
      this.setWords();
      // console.log(this.videoForm.get('subtitles'));
    });
  }

  initVideoForm () {
    this.videoForm = this.fb.group({
      youtubeLink: [this.video.youtubeLink, [Validators.required]],
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
      endTime: [''],
    });
  }

  initWord() {
    return this.fb.group({
      hebrew: [''],
      french: [''],
    });
  }

  get subtitlesForm() {
    return this.videoForm.get('subtitles') as FormArray;
  }

  setWords() {
    this.video.subtitles.forEach(subtitle => {
      const subtitleControl = <FormArray>this.videoForm.get('subtitles');
      subtitleControl.push(this.fb.group({
        words: this.fb.array([]),
        startTime: [subtitle.startTime],
        endTime: [subtitle.endTime]
      }));
      subtitleControl.controls.forEach(subtitleFormGroup => {
        subtitle.words.forEach(word => {
          const wordControl = <FormArray>subtitleFormGroup.get('words');
          wordControl.push(this.fb.group({
            hebrew: [word.hebrew],
            french: [word.french]
          }));
        });
      });
    });
  }

  addSubtitle() {
    const control = <FormArray>this.videoForm.get('subtitles');
    control.push(this.initSubtitle());
  }

  addWord(j) {
    console.log('add word');
    // const wordGroup = this.fb.group({
    //   hebrew: [''],
    //   french: [''],
    // });
    const control = ((<FormArray>this.videoForm.controls['subtitles']).at(j).get('words') as FormArray);
    control.push(this.initWord());
  }

  deleteSubtitle(i) {
    (this.videoForm.controls['subtitles'] as FormArray).removeAt(i);
  }

  deleteWord(i, j) {
    console.log(i, j);
    console.log(this.subtitlesForm);
    this.subtitlesForm.controls.forEach((subtitle: FormGroup) => {
      console.log(subtitle);
      console.log(subtitle.controls['words']);
      (<FormArray>subtitle.controls['words'] as FormArray).removeAt(j);
    });

  }


  resetForm() {

  }

  onSubmit() {
    console.log(this.videoForm.get('youtubeLink'));
    this.videoForm.patchValue({
      lastEdit: Date.now(),
    });
    console.log(this.videoForm.value);
    this.videosService.saveVideo(this.videoForm.value)
      .subscribe( res => {
        console.log(res);
      });
    // this.store.dispatch(new AddWord(this.wordForm.value));
    // this.router.navigateByUrl('/videos');
  }
}
