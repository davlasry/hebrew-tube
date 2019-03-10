import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() user;

  userForm: FormGroup;
  editMode: Boolean;

  constructor(private fb: FormBuilder) {
    this.editMode = false;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required]],
      role: [this.user.role, [Validators.required, Validators.minLength(5)]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]]
    });
  }

  onClickSave() {
    this.editMode = false;
  }
}
