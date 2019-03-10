import { Component, OnInit } from '@angular/core';
import { UserState } from '../../state/user.reducers';
import { Store, select } from '@ngrx/store';
import { getUser } from '../../state/user.selectors';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<any>;
  editMode: Boolean;
  userForm: FormGroup;

  constructor(private store: Store<UserState>, private fb: FormBuilder) {
    this.editMode = false;
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(getUser));
    this.user$.subscribe(user => console.log(user));

    this.user$
      .pipe(
        map(user => {
          return this.fb.group({
            email: [user.email, [Validators.required]],
            role: [user.role, [Validators.required, Validators.minLength(5)]],
            firstName: [user.firstName, [Validators.required]],
            lastName: [user.lastName, [Validators.required]]
          });
        })
      )
      .subscribe((userForm: FormGroup) => {
        this.userForm = userForm;
      });
  }

  onClickSave() {
    console.log('--SAVE USER--');
    this.editMode = false;
  }
}
