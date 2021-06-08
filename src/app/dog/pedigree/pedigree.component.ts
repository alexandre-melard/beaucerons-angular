import { Dog } from '../dog';
import { BackendService } from './../../backend.service';
import { Observable } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrls: ['./pedigree.component.css'],
})
export class PedigreeComponent implements OnInit, OnChanges {
  @Input() uuid!: string;
  data$!: Observable<Dog>;
  depth = 3;
  depthValues?: any;
  depthMap = new Map([
    [2, 200],
    [3, 300],
    [4, 500],
    [5, 700],
    [6, 1200],
    [7, 2000],
  ]);

  constructor(private backendService: BackendService) {
    this.depthValues = Array.from(this.depthMap.keys());
  }

  ngOnInit(): void {
    this.data$ = this.getPedigreeData();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'uuid': {
            this.data$ = this.getPedigreeData();
          }
        }
      }
    }
  }

  private getPedigreeData(): Observable<any> {
//    return this.backendService.getDogPedigreeFromJson();
    return this.backendService.getDogPedigree(this.uuid, 8);
  }

  getHeightValues(depth: number): number | undefined {
    return this.depthMap.get(depth);
  }
}
