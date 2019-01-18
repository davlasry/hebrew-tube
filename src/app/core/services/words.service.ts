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
    console.log(id);
    return this.http.get<any>(`${environment.API_URL}/words/${id}`);
  }

  addWord(word): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/words`, word);
  }

  deleteWord(wordId): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/words/${wordId}`);
  }

  deleteManyWords(wordsIds): Observable<any> {
    wordsIds = wordsIds.map(selectedWord => {
      return selectedWord._id;
    });
    console.log(wordsIds);
    return this.http.put<any>(
      `${environment.API_URL}/words/deleteMany`,
      wordsIds
    );
  }

  // Search Morfix translation
  searchWord(word): Observable<any> {
    console.log(word);
    return this.http.get<any>(`${environment.API_URL}/words/search/${word}`);
  }

  // Find all words for a specific session
  getSessionWords(sessionId): Observable<any> {
    // console.log(sessionId);
    return this.http.get<any>(
      `${environment.API_URL}/words/session-words/${sessionId}`
    );
  }
}
