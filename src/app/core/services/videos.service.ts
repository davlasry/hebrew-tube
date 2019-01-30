import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VideosService {
  constructor(private http: HttpClient) {}

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/videos`);
  }

  getVideo(id): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/videos/${id}`);
  }

  addVideo(video): Observable<any> {
    // console.log(video);
    return this.http.post<any>(`${environment.API_URL}/videos`, video);
  }

  saveVideo(video): Observable<any> {
    return this.http.patch<any>(
      `${environment.API_URL}/videos/${video._id}`,
      video
    );
  }

  deleteVideo(videoId): Observable<any> {
    // console.log(videoId);
    return this.http.delete<any>(`${environment.API_URL}/videos/${videoId}`);
  }
}
