import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  logIn(logInForm) {
    console.log(logInForm);
    return this.http.post<any>(`${environment.API_URL}/auth/login`, logInForm);
  }

  logOut() {
    this.jwtService.destroyToken();
  }

  signUp(signUpForm) {
    // console.log(signUpForm.value);
    signUpForm.value.role = 'admin';
    // console.log(signUpForm.value);
    return this.http.post<any>(`${environment.API_URL}/auth`, signUpForm.value);
  }

  getCurrentUserDetail() {
    return this.http.get<any>(`${environment.API_URL}/users/current`);
  }

  getAllUsers() {
    return this.http.get<any>(`${environment.API_URL}/users`);
  }

  updateUser(recipeId, userDetails) {
    // console.log(userDetails);
    return this.http.patch<any>(
      `${environment.API_URL}/users/words/${recipeId}`,
      userDetails
    );
  }

  addToMyWords(wordToAdd, userId) {
    // console.log(userId);
    console.log(wordToAdd);
    return this.http.patch(
      `${environment.API_URL}/users/addWord/${userId}`,
      wordToAdd
    );
  }

  deleteFromMyWords(wordToDelete, userId) {
    // console.log(userId);
    console.log(wordToDelete);
    return this.http.patch(
      `${environment.API_URL}/users/deleteWord/${userId}`,
      wordToDelete
    );
  }

  getWordsByUser(userId) {
    console.log(userId);
    return this.http.get<any>(`${environment.API_URL}/users/words/${userId}`);
  }
}
