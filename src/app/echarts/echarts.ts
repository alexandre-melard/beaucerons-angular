import {
  Component,
  HostListener,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-echarts',
  template: ''
})
export class Echarts {
  options!: any;
  goTolink: boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardDownEvent(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.goTolink = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUpEvent(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.goTolink = false;
    }
  }

  constructor(protected router: Router) {}

  protected getOptions(): any {}

  protected init(): void {
    this.options = this.getOptions();
  }

  protected update(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName) && changes[propName].currentValue) {
        switch (propName) {
          case 'data':
          case 'depth': {
            this.options = this.getOptions();
            break;
          }
        }
      }
    }
  }

  chartClick(event: any) {
    if (event.data.link && this.goTolink) {
      this.router.navigate([event.data.link]);
    }
  }

  chartRendered() {}
}
