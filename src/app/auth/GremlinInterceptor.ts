import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class GremlinInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('gremlinApi')) {
      let newHeaders = req.headers.delete('gremlinApi');
      let username = 'root';
      let password = '7YYxWTkscVpAOM';
      newHeaders = newHeaders.append('Authorization', `Basic ${window.btoa(username + ':' + password)}`);
      const newreq = req.clone({ headers: newHeaders });
      return next.handle(newreq);
    } else {
      return next.handle(req);
    }
  }
}
