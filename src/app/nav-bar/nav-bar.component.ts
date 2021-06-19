import { ProgressBarService } from './../progress-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  public show: boolean = false;

  constructor(private progressBarService: ProgressBarService) {
    progressBarService.show.subscribe((s) => (this.show = s));
  }

  ngOnInit(): void {}
}
