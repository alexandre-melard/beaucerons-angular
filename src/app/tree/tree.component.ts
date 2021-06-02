import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as util from 'zrender/lib/core/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnChanges {
  @Input() data!: Observable<any>;
  @Input() depth: number = 5;
  options!: Observable<any>;

  constructor(private router: Router) {
    this.options = new Observable();
  }

  getOptions(): Observable<any> {
      return this.data.pipe(
        map((data) => {
          util.each(
            data.children,
            (datum: any) => (datum.collapsed = false)
          );
          return {
              series: [
                {
                  type: 'tree',
                  data: [data],
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
                  expandAndCollapse: false,
                  animationDuration: 550,
                  animationDurationUpdate: 750,
                }
              ]
          };
        })
      );
  }

  ngOnInit(): void {
    this.options = this.getOptions();
  }
  ngOnChanges(): void {
    this.options = this.getOptions();
  }

  chartClick(event: any) {
    if (event.data.link) {
      this.router.navigate([event.data.link]);
    }
  }

  chartRendered() {
  }
}
