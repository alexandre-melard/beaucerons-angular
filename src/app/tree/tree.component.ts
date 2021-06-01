import { Component, OnInit } from '@angular/core';
import { Item } from './node/item';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  tree: Item = {
    "label": "Irko du murier de Sordeille",
    "class": "male",
    "link": "/dogs/id",
    "parents": [
      {
        "label": "Hudson du Fond des Camps",
        "class": "male",
        "link": "/dogs/id",
        "parents": [
          {
            "label": "Artzain du Domaine des Gardiens de la Vallee",
            "class": "male",
            "link": "/dogs/id",
            "parents": [
              {
                "label": "Seneque de la Dame de Coeur",
                "class": "male",
                "link": "/dogs/id"
              },
              {
                "label": "Tara du Gardien de la Puissance",
                "class": "female",
                "link": "/dogs/id"
              }
            ]
          },
          {
            "label": "Vanille",
            "class": "female",
            "link": "/dogs/id",
            "parents": [
              {
                "label": "Rick des Hautes Ruelles",
                "class": "male",
                "link": "/dogs/id"
              },
              {
                "label": "Silk",
                "class": "female",
                "link": "/dogs/id"
              }
            ]
          }
        ]
      },
      {
        "label": "Feeling du Fond des Camps",
        "class": "female",
        "link": "/dogs/id",
        "parents": [
          {
            "label": "Udson du Murier de Sordeille",
            "class": "male",
            "link": "/dogs/id",
            "parents": [
              {
                "label": "Paisley du Pla de la Jasse",
                "class": "male",
                "link": "/dogs/id"
              },
              {
                "label": "O'Lara du Murier de Sordeille",
                "class": "female",
                "link": "/dogs/id"
              }
            ]
          },
          {
            "label": "Voltane",
            "class": "female",
            "link": "/dogs/id",
            "parents": [{
              "label": "Rick des Hautes Ruelles",
              "class": "male",
              "link": "/dogs/id"
            },
            {
              "label": "Silk",
              "class": "female",
              "link": "/dogs/id"
            }
            ]
          }
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
