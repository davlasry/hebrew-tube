import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../data/decodedToken.model';
import { of } from 'rxjs';

@Injectable()
export class JwtService {
  constructor() {}

  decodedToken(): any {
    try {
      return jwt_decode(this.getToken());
    } catch (Error) {
      return null;
    }
  }

  getToken(): string {
    return window.localStorage.getItem('HT_Token');
  }

  checkIfTokenValid() {
    if (this.getToken()) {
      const now = new Date().getTime() / 1000;
      // console.log('decodedToken service', this.decodedToken());
      const exp = parseInt(this.decodedToken()['exp'], 10);
      return of(exp > now);
    } else {
      return of(false);
    }
  }

  saveToken(token: string) {
    window.localStorage.setItem('HT_Token', token);
  }

  destroyToken() {
    window.localStorage.removeItem('HT_Token');
  }

  get currentUser(): DecodedToken {
    // console.log(this.decodeToken(this.getToken()));
    return this.decodedToken();
  }
}
