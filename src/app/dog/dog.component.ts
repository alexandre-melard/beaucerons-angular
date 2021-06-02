import { Observable } from 'rxjs';
import { BackendService } from './../backend.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dog } from '../model/dog';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DogComponent {
  dog?: Dog;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {
    route.params.subscribe((val) => {
      // First get the dog uuid from the current route.
      const routeParams = this.route.snapshot.paramMap;
      let uuid = routeParams.get('uuid');

      if (uuid) {
        // Find the dog that correspond with the uuid provided in route.
        this.backendService.getDogAndParents(uuid).subscribe((dogs) => {
          this.dog = dogs.filter((d) => d.uuid == uuid).pop();
          if (this.dog) {
            this.dog.sir = this.getSir(dogs, uuid);
            if (this.dog.sir) {
              this.dog.sir.type = 'male';
            }
            this.dog.dam = this.getDam(dogs, uuid);
            if (this.dog.dam) {
              this.dog.dam.type = 'female';
            }
          }
        });
      }
    });
  }

  getSir(dogs: Dog[], uuid: string | null): Dog | undefined {
    return this.getParent(dogs, 'Male', uuid);
  }

  getDam(dogs: Dog[], uuid: string | null): Dog | undefined {
    return this.getParent(dogs, 'Female', uuid);
  }

  getRowspan(c: number) {
    return Math.pow(2, 5 - 1 - c);
  }

  private getParent(
    dogs: Dog[],
    type: string,
    uuid: string | null
  ): Dog | undefined {
    return dogs.filter((d) => d.type == type && d.uuid != uuid).pop();
  }
}
