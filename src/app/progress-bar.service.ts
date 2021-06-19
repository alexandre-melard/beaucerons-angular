import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  public show!: Subject<boolean>;

  constructor() {
    this.show = new Subject();
  }

  on() {
    this.show.next(true);
  }
  off() {
    this.show.next(false);
  }
}
