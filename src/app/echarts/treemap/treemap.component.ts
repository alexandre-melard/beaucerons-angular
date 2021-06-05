import { Echarts } from './../echarts';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css'],
})
export class TreemapComponent extends Echarts implements OnInit {
  @Input() data!: any;
  @Input() depth: number = 5;
  @Input() height?: number = 500;

  constructor(protected router: Router) {
    super(router);
  }

  getLevelOption() {
    return [
      {
        itemStyle: {
          borderColor: '#777',
          borderWidth: 0,
          gapWidth: 1,
        },
        upperLabel: {
          show: false,
        },
      },
      {
        itemStyle: {
          borderColor: '#555',
          borderWidth: 5,
          gapWidth: 1,
        },
        emphasis: {
          itemStyle: {
            borderColor: '#ddd',
          },
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6,
        },
      },
    ];
  }

  getOptions(): any {
    return {
      title: {
        text: 'Disk Usage',
        left: 'center',
      },

      tooltip: {
        formatter: function (info: any) {
          var treePathInfo = info.treePathInfo;
          var treePath = [];

          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }

          return [
            '<div class="tooltip-title">' + treePath.join('/') + '</div>',
          ].join('');
        },
      },

      series: [
        {
          name: 'Disk Usage',
          type: 'treemap',
          visibleMin: 300,
          label: {
            show: true,
            formatter: '{b}',
          },
          upperLabel: {
            show: true,
            height: 30,
          },
          itemStyle: {
            borderColor: '#fff',
          },
          levels: this.getLevelOption(),
          data: this.data,
        },
      ],
    };
  }

  ngOnInit(): void {
    this.init();
  }
}
