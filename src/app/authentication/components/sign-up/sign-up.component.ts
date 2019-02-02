import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      firstName: [''],
      lastName: ['']
    });
  }

  signUp() {
    this.usersService.signUp(this.signUpForm).subscribe(
      res => {
        console.log(res);
        this.usersService.logIn(res);
        this.jwtService.saveToken(res.token);
        this.router.navigateByUrl('/');
      },
      err => console.log(err)
    );
  }
}
