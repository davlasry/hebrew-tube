import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserSignOut } from 'src/app/authentication/state/user.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, private store: Store<any>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = this.jwtService.getToken();

    console.log(req.url);

    if (
      idToken &&
      (req.url.indexOf('google') === -1 && req.url.indexOf('youtube') === -1)
    ) {
      console.log('req.url interceptor', req.url);
      const cloned = req.clone({
        headers: req.headers.set('x-access-token', `${idToken}`)
      });

      return next.handle(cloned).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          // console.log('error in response----->>>', error);
          let data = {};
          data = {
            reason: error && error.error.message ? error.error.message : '',
            status: error.status
          };
          if (data['reason'] === 'User not connected.') {
            this.store.dispatch(new UserSignOut());
          }
          // this.errorDialogService.openDialog(data);
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
