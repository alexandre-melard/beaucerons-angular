import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { HttpClientModule } from '@angular/common/http';
import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig,
} from 'ngx-cookieconsent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchComponent } from './search/search.component';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { DogComponent } from './dog/dog.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost', // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000',
    },
    button: {
      background: '#f1d600',
    },
  },
  theme: 'edgeless',
  type: 'opt-out',
  content: {
    message:
      'This website uses cookies to ensure you get the best experience on our website.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://cookiesandyou.com',
    policy: 'Cookie Policy',
  },
};

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'dog/:uuid', component: DogComponent },
    ]),
    NgbModule,
    AuthModule.forRoot({
      domain: 'beaucerons.eu.auth0.com',
      clientId: '5AgGMOvuI9gSzLIi3riZGKhimr6V70lb',
    }),
    HttpClientModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    BrowserAnimationsModule,
    MatAutocompleteModule,
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    AuthButtonComponent,
    SearchComponent,
    DogDetailsComponent,
    DogComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
