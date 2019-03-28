import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get(`${environment.API_URL}/word`);
  }

  getWord(id): Observable<any> {
    // console.log(id);
    return this.http.get<any>(`${environment.API_URL}/word/${id}`);
  }

  searchWord(searchString): Observable<any> {
    // console.log(id);
    return this.http.get<any>(
      `${environment.API_URL}/word/search/${searchString}`
    );
  }

  getWordContext(id): Observable<any> {
    // console.log(id);
    return this.http.get<any>(`${environment.API_URL}/context/${id}`);
  }

  addWord(word): Observable<any> {
    console.log('ADD WORD SERVICE', word);
    return this.http.post<any>(`${environment.API_URL}/word`, word);
  }

  deleteWord(wordId): Observable<any> {
    console.log('DELETE WORD SERVICE', wordId);
    return this.http.delete<any>(`${environment.API_URL}/word/${wordId}`);
  }

  deleteManyWords(wordId): Observable<any> {
    console.log('DELETE MANY WORDS SERVICE', wordId);
    return this.http.delete<any>(`${environment.API_URL}/word/`);
  }

  // deleteManyWords(wordsIds): Observable<any> {
  //   return this.http.delete<any>(`${environment.API_URL}/word`, {
  //     wordsIds
  //   });
  // }
}
