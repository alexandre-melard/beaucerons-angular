import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    if (req.headers.get('api')) {
      return this.auth.getAccessToken().pipe(
        mergeMap((authToken) => {
          let newHeaders = req.headers.delete('api');
          newHeaders = newHeaders.append(
            'Authorization',
            `Bearer ${authToken}`
          );
          return next.handle(req.clone({ headers: newHeaders }));
        })
      );
    }
    return next.handle(req);
  }
}
