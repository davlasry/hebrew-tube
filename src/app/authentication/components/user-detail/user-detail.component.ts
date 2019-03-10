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

  roles = [
    { value: 'admin', viewValue: 'admin' },
    { value: 'user', viewValue: 'user' }
  ];

  constructor(private fb: FormBuilder) {
    this.editMode = false;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required]],
      Role: [this.user.role, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]]
    });
  }

  onClickSave() {
    this.editMode = false;
  }
}
