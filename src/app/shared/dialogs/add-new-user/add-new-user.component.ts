import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AddWord } from 'src/app/words/state/actions/words.actions';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  userForm: FormGroup;

  roles = [
    { value: 'admin', viewValue: 'admin' },
    { value: 'user', viewValue: 'user' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private usersService: UsersService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetForm() {}

  onSubmit() {
    console.log(this.userForm.value);
    this.usersService.signUp(this.userForm).subscribe(result => {
      console.log(result);
    });
    this.dialogRef.close();
  }
}
