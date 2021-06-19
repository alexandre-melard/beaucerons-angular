import { Owner } from './../../../person/owner/Owner';
import { BackendService } from './../../../backend.service';
import { Dog } from './../../dog';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  dog: Dog;
}

@Component({
  selector: 'app-dog-details-confirm',
  templateUrl: './dog-details-confirm.component.html',
  styleUrls: ['./dog-details-confirm.component.css'],
})
export class DogDetailsConfirmComponent implements OnInit {
  @Input() dog!: Dog;

  constructor(public dialog: MatDialog, private backend: BackendService) {}

  openDialog() {
    const dialogRef = this.dialog.open(DogDetailsConfirmDialogComponent, {
      data: {
        dog: this.dog
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.backend.confirmDog(this.dog.uuid, this.dog.owner?.uuid).subscribe(() => this.dog.verified = true);
      }
    });
  }
  ngOnInit() {}
}

@Component({
  selector: 'dog-details-confirm-dialog',
  templateUrl: 'dog-details-confirm-dialog.component.html',
})
export class DogDetailsConfirmDialogComponent {
  dog!: Dog;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dog = data.dog;
  }
}
