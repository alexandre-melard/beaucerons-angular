import { BackendService } from './../backend.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dog } from '../model/dog';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DogComponent implements OnInit {
  uuid?: string;
  dog?: Dog;
  dogs?: Dog[];

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
      this.backendService.getDogAndParents(this.uuid).subscribe((dogs) => {
        this.dog = dogs.filter((d) => d.uuid == this.uuid).pop();
        if (this.dog) {
          this.dog.sir = this.getSir(dogs);
          this.dog.dam = this.getDam(dogs);
        }
      });
      this.getDogAncestors(this.uuid);
    });
  }

  private getDogAncestors(uuid: string, generations=5) {
    this.backendService.getDogAncesters(uuid, generations).subscribe((dogs) => {
      console.log(dogs);
      this.dogs = dogs;
    });
  }

  private printDog(dog: Dog, type?: string, first?: boolean): string {
    if(dog.sir||dog.dam) {
      let output = '';
      if (!first) {
        output += '<li>';
      }
      output += `<a href="/dog/${dog.uuid}"><span class="${type ? type : 'unknown'}">${dog.name.substring(0,40)}</span></a>`;
      output += '<ul>';
      if (dog.sir) {
        output += `${this.printDog(dog.sir, 'male')}`;
      }
      if (dog.dam) {
        output += `${this.printDog(dog.dam, 'female')}`;
      }
      output += '</ul></li>';
      return output;
    } else {
      return `<li class=""> <a href="/dog/${dog.uuid}"><span class="${type ? type : 'unknown'}">${dog.name.substring(0,40)}</span></a></li>`;
    }
  }

  printPedigree(): string | undefined {
    if (this.dogs && this.dogs.length > 0) {
      let output = '';
      output += this.printDog(this.dogs[0], this.dog?.type.toLowerCase(), true);
      console.log(output);
      return output;
    }
    return "<p>This dog has unknown parents in our system</p>";
  }

  ngOnInit() {}

  getDog(dogs: Dog[]): Dog | undefined {
    return;
  }

  getSir(dogs: Dog[]): Dog | undefined {
    return this.getParent(dogs, 'Male');
  }

  getDam(dogs: Dog[]): Dog | undefined {
    return this.getParent(dogs, 'Female');
  }

  getRowspan(c: number) {
    return Math.pow(2, 5 - 1 - c);
  }

  private getParent(dogs: Dog[], type: string): Dog | undefined {
    return dogs.filter((d) => d.type == type && d.uuid != this.uuid).pop();
  }
}
