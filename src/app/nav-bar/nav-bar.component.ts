import { AuthService } from '@auth0/auth0-angular';
import { ProgressBarService } from './../progress-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  public showProgressbar: boolean = false;

  constructor(
    private progressBarService: ProgressBarService,
    public auth: AuthService
  ) {
    progressBarService.show.subscribe((s) => (this.showProgressbar = s));
  }

  ngOnInit(): void {}
}
