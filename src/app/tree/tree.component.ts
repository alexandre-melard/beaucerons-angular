import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import * as util from 'zrender/lib/core/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  options!: Observable<any>;
  @Input() data!: Observable<any>;

  constructor(private router: Router) {
    this.options = new Observable();
  }

  ngOnInit(): void {
    this.data.subscribe((data: any) => {
      util.each(
        data.children,
        (datum: any, index: any) => (datum.collapsed = false)
      );
      this.options = new Observable((observer) => {
        observer.next({
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
              initialTreeDepth: 5,
              expandAndCollapse: false,
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
        });
      });
    });
  }

  onChartClick(event: any) {
    if (event.data.link) {
      this.router.navigate([event.data.link]);
    }
  }
}
