import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionsService {

  constructor(
    private http: HttpClient,
  ) { }

  getSessions(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/sessions`);
  }

  getSession(id): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/sessions/${id}`);
  }

  addSession(session): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/sessions`, session);
  }

  saveSession(session): Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/sessions/${session._id}`, session);
  }

  deleteSession(sessionId): Observable<any> {
    console.log(sessionId);
    return this.http.delete<any>(`${environment.API_URL}/sessions/${sessionId}`);
  }

}
