import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../state/user.reducers';
import { LoadUser, Login } from '../../state/user.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;

  serverError: String;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<UserState>
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  login() {
    console.log(this.loginForm.value);
    this.store.dispatch(new Login(this.loginForm.value));
  }
}
