import { Dog } from './../../model/dog';
import { BackendService } from './../../backend.service';
import { Observable } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-offsprings',
  templateUrl: './offsprings.component.html',
  styleUrls: ['./offsprings.component.css']
})
export class OffspringsComponent implements OnInit, OnChanges {
  @Input() uuid!: string;
  data!: Observable<Dog>;
  depth = 1;
  depthValues?: any;
  depthMap = new Map([
    [1, 1296],
    [2, 1296],
    [3, 1296],
    [4, 1296],
    [5, 1296],
    [6, 1296],
  ]);

  constructor(private backendService: BackendService) {
    this.depthValues = Array.from(this.depthMap.keys());
  }

  ngOnInit(): void {
    this.data = this.getOffspringsData();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'uuid': {
            this.data = this.getOffspringsData();
          }
        }
      }
    }
  }

  private getOffspringsData(): Observable<any> {
    return this.backendService.getDogOffsprings(this.uuid, 8);
  }

  getHeightValues(depth: number): number | undefined {
    return this.depthMap.get(depth);
  }
}
