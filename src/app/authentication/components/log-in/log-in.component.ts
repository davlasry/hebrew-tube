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

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;

  serverError: String;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get email(): AbstractControl {
    return this.logInForm.get('email');
  }
  get password(): AbstractControl {
    return this.logInForm.get('password');
  }

  login() {
    this.usersService.logIn(this.logInForm.value).subscribe(
      res => {
        this.jwtService.saveToken(res.token);
        this.usersService.setLoggedInValue(true);
        this.usersService.setCurrentUser();
        this.router.navigateByUrl('profile');
      },
      err => {
        this.serverError = err.error.msg;
        console.log(err);
      }
    );
  }
}
