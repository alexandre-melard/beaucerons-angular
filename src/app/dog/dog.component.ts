import { BackendService } from './../backend.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Dog } from '../model/dog';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css'],
})
export class DogComponent implements OnInit {
  dogs$?: Observable<Dog[]>;
  ancesters$?: Observable<Dog[]>;
  uuid?: string;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {
    route.params.subscribe((val) => {
      // First get the dog uuid from the current route.
      const routeParams = this.route.snapshot.paramMap;
      this.uuid = String(routeParams.get('uuid'));
      console.debug(`uuid param: ${this.uuid}`);

      // Find the dog that correspond with the uuid provided in route.
      this.dogs$ = this.backendService.getDogAndParents(this.uuid);
      this.ancesters$ = this.backendService.getDogAncesters(this.uuid);
    });
  }

  ngOnInit() {}

  getDog(dogs: Dog[]): Dog | undefined {
    return dogs.filter((d) => d.uuid == this.uuid).pop();
  }

  getSir(dogs: Dog[]): Dog | undefined {
    return this.getParent(dogs, 'Male');
  }

  getDam(dogs: Dog[]): Dog | undefined {
    return this.getParent(dogs, 'Female');
  }

  private getParent(dogs: Dog[], type: string): Dog | undefined {
    return dogs.filter((d) => d.type == type && d.uuid != this.uuid).pop();
  }
}
