import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as xml2js from 'xml2js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subtitlesUrl = 'http://video.google.com/timedtext?lang=iw&v=F9TOJEE3pdI';
  transcript;
  newSubtitle;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getVideoSubtitlesJson();
  }

  getVideoSubtitlesXML() {
    return this.http.get(
      `http://video.google.com/timedtext?lang=iw&v=dLsnhmAj-TI`,
      {
        responseType: 'text'
      }
    );
  }

  decodeHTML = function(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  getVideoSubtitlesJson() {
    this.getVideoSubtitlesXML().subscribe(result => {
      // console.log('getVideoSubtitlesJson result', result);
      const decodedResult = this.decodeHTML(result);
      xml2js.Parser().parseString(decodedResult, (err, res) => {
        console.log(res);
        this.transcript = res.transcript.text;
        this.transformTranscript();
        return res;
      });
    });
  }

  transformTranscript() {
    // console.log('this.transcript', this.transcript);
    this.newSubtitle = this.transcript.map(subtitle => {
      // console.log('subtitle string', subtitle['_']);
      // let words = subtitle['_'].split(' ');

      const sentence = unescape(
        subtitle._.replace('"', '\\"')
          .replace('\n', ' ')
          .replace(/[\u202B]/gu, '')
      ).split(' ');

      // console.log('words', words);
      const words = sentence.map(word => {
        word = word.replace('\n', ' ').replace('"', '');
        return { hebrew: word, french: '', pronunciation: '', type: '' };
      });
      // console.log('words', words);
      return {
        startTime: subtitle['$']['start'],
        endTime: subtitle['$']['start'] + subtitle['$']['dur'],
        words,
        sentence
      };
    });
    console.log('this.newSubtitle', this.newSubtitle);
  }
}
