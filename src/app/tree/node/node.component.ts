import { Component, Input, OnInit } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() item!: Item;
  @Input() branch: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
