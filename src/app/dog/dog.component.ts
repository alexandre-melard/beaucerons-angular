import { Observable } from 'rxjs';
import { BackendService } from './../backend.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dog } from './dog';

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
        this.backendService.getDog(uuid).subscribe((dog) => {
          this.dog = this.initDog(dog);
          this.backendService.getDogParents(dog.uuid).subscribe((dogs) => {
            if (this.dog) {
              this.dog.sir = this.getSir(dogs, dog.uuid);
              if (this.dog.sir) {
                this.dog.sir.type = 'male';
                this.dog.sir = this.initDog(this.dog.sir);
              }
              this.dog.dam = this.getDam(dogs, dog.uuid);
              if (this.dog.dam) {
                this.dog.dam.type = 'female';
                this.dog.dam = this.initDog(this.dog.dam);
              }
            }
          });
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

  private initDog(dog: Dog): Dog {
    if (dog.other) {
      const lof = dog.other.split(';').filter(o => o.includes('LOF'));
      if(lof && lof.length > 0) {
        dog.other = dog.other?.replace(`${lof[0]};`, '');
        dog.reg = lof[0].replace(/LOF\s*/, '');
        dog.book = 'LOF';
        let id = dog.ship;
        if (dog.tattoo && dog.tattoo.length > 1) {
          id = encodeURIComponent(dog.tattoo);
        }
        if (id) {
          dog.bookLink = `https://www.centrale-canine.fr/lofselect/recherche-chien/identifiant?identification=${id}`;
        }
        dog.others = dog.other.split(';')
      }
    }
    if (dog?.uuid) {
      dog.link = `/dog/${dog.uuid}`;
    }
    return dog;

  }

  getLink() {
  }

}
