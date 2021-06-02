import { Dog } from './../../model/dog';
import { BackendService } from './../../backend.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrls: ['./pedigree.component.css'],
})
export class PedigreeComponent implements OnInit {
  data!: Observable<Dog>;
  @Input() uuid!: Observable<string>;
  constructor(
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.uuid.subscribe(uuid => {
      this.data = this.backendService.getDogAncesters(uuid, 5);
    })
  }
}
