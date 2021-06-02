import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as util from 'zrender/lib/core/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnChanges, OnInit {
  @Input() data!: any;
  @Input() depth: number = 5;
  @Input() height?: number = 500;
  options!: any;

  constructor(private router: Router) {}

  getOptions(): any {
    if (!this.data) {
      return;
    }
    if (this.data.children) {
      util.each(this.data.children, (datum: any) => (datum.collapsed = false));
    }
    return {
      series: [
        {
          type: 'tree',
          data: [this.data],
          top: '1%',
          left: '10%',
          bottom: '1%',
          right: '10%',
          symbolSize: 7,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9,
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },
          initialTreeDepth: this.depth,
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };
  }

  ngOnInit(): void {
    this.options = this.getOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
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
    if (event.data.link) {
      this.router.navigate([event.data.link]);
    }
  }

  chartRendered() {}
}
