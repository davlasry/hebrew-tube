import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {

  isWordsOpenSubject = new BehaviorSubject(true);
  isWordsOpen$ = this.isWordsOpenSubject.asObservable();

  constructor() { }

  toggleWords(val) {
    this.isWordsOpenSubject.next(val);
  }
}
