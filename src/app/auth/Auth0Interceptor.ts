import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { Auth0Service } from './Auth0.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class Auth0Interceptor implements HttpInterceptor {
  constructor(private auth: Auth0Service) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('beauceronsApi')) {
      if (req.headers.get('publicApi')) {
        return this.auth.getAccessToken(true).pipe(
          mergeMap((authToken) => {
            let newHeaders = req.headers.delete('beauceronsApi', 'publicApi');
            newHeaders = newHeaders.append('Authorization', `Bearer ${authToken}`);
            return next.handle(req.clone({ headers: newHeaders }));
          })
        );
      } else {
        return this.auth.getAccessToken(false).pipe(
          mergeMap((authToken) => {
            if (authToken === 'Unauthorized') {
              return throwError('401 Unauthorized');
            } else {
              let newHeaders = req.headers.delete('beauceronsApi');
              newHeaders = newHeaders.append('Authorization', `Bearer ${authToken}`);
              return next.handle(req.clone({ headers: newHeaders }));
            }
          })
        );
      }
    }
    return next.handle(req);
}
}
