import { Dog } from './../../model/dog';
import { BackendService } from './../../backend.service';
import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrls: ['./pedigree.component.css'],
})
export class PedigreeComponent {
  data!: Observable<Dog>;
  @Input() uuid!: Observable<string>;
  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {
    route.params.subscribe((val) => {
      const routeParams = this.route.snapshot.paramMap;
      let uuid = routeParams.get('uuid');
      if (uuid) {
        this.data = this.backendService.getDogAncesters(uuid, 5);
      }
    })
  }
}
