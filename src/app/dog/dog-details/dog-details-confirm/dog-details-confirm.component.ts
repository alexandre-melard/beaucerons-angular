import { Dog } from './../../dog';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dog-details-confirm',
  templateUrl: './dog-details-confirm.component.html',
  styleUrls: ['./dog-details-confirm.component.css']
})
export class DogDetailsConfirmComponent implements OnInit {
  @Input() dog!: Dog;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DogDetailsConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
    ngOnInit() {
  }

}

@Component({
  selector: 'dog-details-confirm-dialog',
  templateUrl: 'dog-details-confirm-dialog.component.html'
})
export class DogDetailsConfirmDialogComponent {}
