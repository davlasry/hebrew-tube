import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';

import * as xml2js from 'xml2js';

@Injectable()
export class YoutubeApiService {
  base_url = 'https://www.googleapis.com/youtube/v3/';

  constructor(private http: HttpClient) {}

  getVideoSubtitlesXML() {
    return this.http.get(
      `http://video.google.com/timedtext?lang=iw&v=dLsnhmAj-TI`,
      {
        responseType: 'text'
      }
    );
  }

  // getVideoSubtitlesJson() {
  //   this.getVideoSubtitlesXML().subscribe(result => {
  //     console.log('getVideoSubtitlesJson result', result);
  //     const decodedResult = this.decodeHTML(result);
  //     xml2js.Parser().parseString(decodedResult, (err, res) => {
  //       console.log(res);
  //       return res;
  //     });
  //   });
  // }
  decodeHTML = function(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
}
