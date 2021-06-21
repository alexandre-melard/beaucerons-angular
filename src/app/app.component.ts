import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NgcCookieConsentService,
  NgcInitializeEvent,
  NgcStatusChangeEvent,
  NgcNoCookieLawEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'beaucerons';

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription | undefined;
  private popupCloseSubscription: Subscription | undefined;
  private initializeSubscription: Subscription | undefined;
  private statusChangeSubscription: Subscription | undefined;
  private revokeChoiceSubscription: Subscription | undefined;
  private noCookieLawSubscription: Subscription | undefined;

  constructor(private ccService: NgcCookieConsentService, private userService: UserService) {}

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
      console.log('popupOpenSubscription');
    });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log('initializeSubscription');
      }
    );

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log('statusChangeSubscription');
      }
    );

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log('revokeChoiceSubscription');
      }
    );

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log('noCookieLawSubscription');
      }
    );
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription && this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription && this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription && this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription && this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription && this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription && this.noCookieLawSubscription.unsubscribe();
  }
}
