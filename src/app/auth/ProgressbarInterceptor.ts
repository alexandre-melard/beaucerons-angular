import { finalize, tap } from 'rxjs/operators';
import { ProgressBarService } from '../progress-bar.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class ProgressbarInterceptor implements HttpInterceptor {
  constructor(private progressBarService: ProgressBarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progressBarService.on();
    return next.handle(req).pipe(finalize( () => this.progressBarService.off()));
  }
}
