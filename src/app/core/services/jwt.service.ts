import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../data/decodedToken.model';

@Injectable()
export class JwtService {
  constructor() {
    // console.log(this.decodeToken(this.getToken()));
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getToken(): string {
    return window.localStorage.getItem('User_Token_Id');
  }

  checkIfTokenExpired() {
    const now = new Date().getTime() / 1000;
    const exp = parseInt(window.localStorage.getItem('User_Token_Exp'), 10);
    return now > exp;
  }

  saveToken(token: string) {
    const decodedToken = this.decodeToken(token);
    // console.log(decodedToken);
    window.localStorage.setItem('User_Token_Id', token);
    window.localStorage.setItem('User_Token_Exp', decodedToken.exp);
  }

  destroyToken() {
    window.localStorage.removeItem('User_Token_Id');
    window.localStorage.removeItem('User_Token_Exp');
  }

  get currentUser(): DecodedToken {
    // console.log(this.decodeToken(this.getToken()));
    return this.decodeToken(this.getToken());
  }
}
