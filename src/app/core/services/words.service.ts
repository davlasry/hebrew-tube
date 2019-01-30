import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get<any[]>(`${environment.API_URL}/words`);
  }

  getWord(id): Observable<any> {
    // console.log(id);
    return this.http.get<any>(`${environment.API_URL}/words/getWord/${id}`);
  }

  addWord(word): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/words`, word);
  }

  deleteWord(wordId): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/words/${wordId}`);
  }

  deleteManyWords(wordsIds): Observable<any> {
    // console.log(wordsIds);
    return this.http.patch<any>(`${environment.API_URL}/words/deleteMany`, {
      wordsIds
    });
  }

  // Search Morfix translation
  // searchWord(word): Observable<any> {
  //   console.log(word);
  //   return this.http.get<any>(`${environment.API_URL}/words/search/${word}`);
  // }
}
