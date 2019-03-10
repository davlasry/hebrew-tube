import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  logIn(logInForm) {
    // console.log('loginForm service', logInForm);
    return this.http.post<any>(`${environment.API_URL}/auth/login`, logInForm);
  }

  logOut() {
    this.jwtService.destroyToken();
    return this.http.get<any>(`${environment.API_URL}/auth/logout`);
  }

  signUp(signUpForm) {
    // console.log(signUpForm.value);
    signUpForm.value.role = 'admin';
    // console.log(signUpForm.value);
    return this.http.post<any>(`${environment.API_URL}/user`, signUpForm.value);
  }

  getUserDetails(userID) {
    return this.http.get<any>(`${environment.API_URL}/user/${userID}`);
  }

  getAllUsers() {
    return this.http.get<any>(`${environment.API_URL}/user`);
  }

  updateUser(recipeId, userDetails) {
    // console.log('updateUser Service', userDetails);
    return this.http.patch<any>(
      `${environment.API_URL}/users/words/${recipeId}`,
      userDetails
    );
  }

  getWordsByUser(userId) {
    // console.log('getWordsByUser service', userId);
    return this.http.get<any>(`${environment.API_URL}/favorite/word`);
  }

  addToMyWords(wordToAdd) {
    // console.log('ADD TO MY WORDS SERVICE', wordToAdd);
    return this.http.post(`${environment.API_URL}/favorite/word/`, {
      wordID: wordToAdd._id
    });
  }

  deleteFromMyWords(wordID) {
    // console.log('DELETE FROM MY WORDS SERVICE wordId', wordID);
    return this.http.delete<any>(
      `${environment.API_URL}/favorite/word/${wordID}`
    );
  }

  deleteManyFromMyWords(wordsIds) {
    // console.log('DELETE FROM MY WORDS SERVICE wordsIds', wordsIds);
    return this.http.post<any>(`${environment.API_URL}/favorite/deleteWords`, {
      wordsIds
    });
  }

  getVideosByUser(userId) {
    console.log('getVideosByUser service', userId);
    return this.http.get<any>(`${environment.API_URL}/favorite/video`);
  }

  addToMyVideos(videoToAdd) {
    // console.log('ADD TO MY VIDEOS SERVICE', videoToAdd);
    return this.http.post(`${environment.API_URL}/favorite/video/`, {
      videoID: videoToAdd._id
    });
  }

  deleteFromMyVideos(videoID) {
    // console.log('DELETE FROM MY VIDEOS SERVICE videoID', videoID);
    return this.http.delete<any>(
      `${environment.API_URL}/favorite/video/${videoID}`
    );
  }

  deleteManyFromMyVideos(videosIds) {
    // console.log('DELETE FROM MY VIDEOS SERVICE videosIds', videosIds);
    return this.http.post<any>(`${environment.API_URL}/favorite/deleteVideos`, {
      videosIds
    });
  }
}
