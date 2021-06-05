import { Echarts } from './../echarts';
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
export class TreeComponent extends Echarts implements OnChanges, OnInit {
  @Input() data!: any;
  @Input() depth: number = 5;
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
      title: {
        left: '0',
        bottom: '0',
        subtext:
          "Click on the dog's name to show or hide it's parents.\nPress CTRL+Click on the dog's name to go to it's page.",
        subtextStyle: {
          fontStyle: 'italic',
        },
      },
      tooltip: {
        formatter: (params: any) => {
          let txt = `<strong>${params.data.name}</strong><p>`;
          if (params.data.children) {
            txt += 'Click to show or hide his parents.';
          }
          if (params.data.link) {
            txt += `<br>Press CTRL+Click to go to <br><i>${params.data.link}</i>.`;
          }
          return txt;
        }

      },
      series: [
        {
          type: 'tree',
          data: [this.data],
          top: '1%',
          left: '14%',
          bottom: '1%',
          right: '10%',
          symbolSize: 7,
          emphasis: {
            focus: 'descendant',
          },
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 11,
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
              formatter: (params: any) =>
                params.data.name.length > 20
                  ? `${params.data.name.substring(0, 20)}...`
                  : params.data.name,
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
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update(changes);
  }
}
