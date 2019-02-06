import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get<any[]>(`${environment.API_URL}/word`);
  }

  getWord(id): Observable<any> {
    // console.log(id);
    return this.http.get<any>(`${environment.API_URL}/word/${id}`);
  }

  addWord(word): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/word`, word);
  }

  deleteWord(wordId): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/word/${wordId}`);
  }

  // deleteManyWords(wordsIds): Observable<any> {
  //   return this.http.delete<any>(`${environment.API_URL}/word`, {
  //     wordsIds
  //   });
  // }
}
