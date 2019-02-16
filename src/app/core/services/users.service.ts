import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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
    return this.http.get<any>(`${environment.API_URL}/auth/logout`);
  }

  signUp(signUpForm) {
    // console.log(signUpForm.value);
    signUpForm.value.role = 'admin';
    console.log(signUpForm.value);
    return this.http.post<any>(`${environment.API_URL}/user`, signUpForm.value);
  }

  getUserDetails(userID) {
    return this.http.get<any>(`${environment.API_URL}/user/${userID}`);
  }

  getAllUsers() {
    return this.http.get<any>(`${environment.API_URL}/user`);
  }

  updateUser(recipeId, userDetails) {
    // console.log(userDetails);
    return this.http.patch<any>(
      `${environment.API_URL}/users/words/${recipeId}`,
      userDetails
    );
  }

  getWordsByUser(userId) {
    console.log(userId);
    return this.http.get<any>(`${environment.API_URL}/favorite/word`);
  }

  addToMyWords(wordToAdd) {
    console.log(wordToAdd);
    return this.http.post(`${environment.API_URL}/favorite/word/`, {
      wordID: wordToAdd._id
    });
  }

  deleteFromMyWords(wordsIds, userId) {
    // console.log(wordsIds);
    // console.log(userId);
    return this.http.delete<any>(
      `${environment.API_URL}/favorite/word`,
      wordsIds
    );
  }
}
