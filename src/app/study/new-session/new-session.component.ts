import { SessionsService } from './../../core/services/sessions.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit {

  sessionForm: FormGroup;

  optionSelected: string;

  constructor(
    private fb: FormBuilder,
    private sessionsService: SessionsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sessionForm = this.fb.group({
      name: ['', [Validators.required]],
      youtubeLink: [''],
    });
  }

  onCreate() {
    this.sessionsService.addSession(this.sessionForm.value).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl(`study/youtube/${res._id}`);
    });
  }

  onOptionSelected(option) {
    this.optionSelected = option;
  }

}
