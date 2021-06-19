import { Component } from '@angular/core';
import { Dog } from '../dog';
import { Input } from '@angular/core';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.css'],
})
export class DogDetailsComponent {
  @Input() dog!: Dog;
    constructor() {}

    linkLabel() {
      return this.dog.bookLink?.split('/').slice(0,3).join('/');
    }
}
