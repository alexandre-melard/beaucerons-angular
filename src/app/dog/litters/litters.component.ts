import { Dog } from './../../model/dog';
import { BackendService } from './../../backend.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-litters',
  templateUrl: './litters.component.html',
  styleUrls: ['./litters.component.css']
})
export class LittersComponent implements OnInit {
  data!: Observable<Dog>;
  @Input() uuid!: string;

  constructor(
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.data = this.getLitterData();
  }

  ngOnChanges(): void {
    this.data = this.getLitterData();
  }

  private getLitterData(): Observable<any> {
    return this.backendService.getDogPedigree(this.uuid);
  }
}
