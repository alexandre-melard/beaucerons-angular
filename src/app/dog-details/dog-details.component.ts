import { BackendService } from '../backend.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dog } from '../model/dog';
import { Input } from '@angular/core';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.css'],
})
export class DogDetailsComponent {
  @Input() dog!: Dog;
    constructor() {}
}
