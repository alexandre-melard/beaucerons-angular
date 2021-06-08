import { GremlinInterceptor } from './auth/GremlinInterceptor';
import { Auth0Interceptor } from './auth/Auth0Interceptor';
import { TreemapComponent } from './echarts/treemap/treemap.component';
import { RadialComponent } from './echarts/radial/radial.component';
import { OffspringsComponent } from './dog/offsprings/offsprings.component';
import { NgModule } from '@angular/core';
import { TreeComponent } from './echarts/tree/tree.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig,
} from 'ngx-cookieconsent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { SearchComponent } from './search/search.component';
import { DogDetailsComponent } from './dog/dog-details/dog-details.component';
import { DogComponent } from './dog/dog.component';
import { PedigreeComponent } from './dog/pedigree/pedigree.component';

import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts/theme/macarons.js';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);
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
    NgxEchartsModule.forRoot({ echarts }),
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'dog/:uuid', component: DogComponent },
      { path: 'dog/:uuid/pedigree', component: PedigreeComponent },
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
    PedigreeComponent,
    OffspringsComponent,
    TreeComponent,
    TreemapComponent,
    RadialComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Auth0Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GremlinInterceptor, multi: true },
  ],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
