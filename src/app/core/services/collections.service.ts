import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class CollectionsService {
  constructor(private http: HttpClient) {}

  getCollections() {
    return this.http.get(`${environment.API_URL}/collection`);
  }

  getCollection(id): Observable<any> {
    // console.log(id);
    return this.http.get<any>(`${environment.API_URL}/collection/${id}`);
  }

  createCollection(collection): Observable<any> {
    console.log('CREATE COLLECTION SERVICE', collection);
    return this.http.post<any>(`${environment.API_URL}/collection`, collection);
  }

  deleteCollection(collectionId): Observable<any> {
    console.log('DELETE COLLECTION SERVICE', collectionId);
    return this.http.delete<any>(
      `${environment.API_URL}/collection/${collectionId}`
    );
  }

  updateCollection(collectionId): Observable<any> {
    console.log('UPDATE COLLECTION SERVICE', collectionId);
    return this.http.post<any>(
      `${environment.API_URL}/collection/${collectionId}`,
      collectionId
    );
  }
}
