import { Echarts } from './../echarts';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as util from 'zrender/lib/core/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radial',
  templateUrl: './radial.component.html',
  styleUrls: ['./radial.component.css'],
})
export class RadialComponent extends Echarts implements OnChanges, OnInit {
  @Input() data!: any;
  @Input() depth: number = 1;
  @Input() height?: number = 500;

  constructor(protected router: Router) {
    super(router);
  }

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
          layout: 'radial',
          data: [this.data],
          top: '18%',
          bottom: '14%',
          symbol: 'emptyCircle',
          symbolSize: 7,
          initialTreeDepth: this.depth,
          animationDurationUpdate: 750,
          emphasis: {
              focus: 'descendant'
          }
        },
      ],
    };
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update(changes);
  }
}
