import { ProgressbarInterceptor } from './auth/ProgressbarInterceptor';
import { ProgressBarService } from './progress-bar.service';
import { cookies } from './cookies';
import { environment } from './../environments/environment';
import { TreemapComponent } from './echarts/treemap/treemap.component';
import { RadialComponent } from './echarts/radial/radial.component';
import { OffspringsComponent } from './dog/offsprings/offsprings.component';
import { NgModule } from '@angular/core';
import { TreeComponent } from './echarts/tree/tree.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  AuthModule,
  AuthHttpInterceptor,
  AuthGuard,
} from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { SearchComponent } from './search/search.component';
import { DogDetailsComponent } from './dog/dog-details/dog-details.component';
import { DogDetailsConfirmComponent, DogDetailsConfirmDialogComponent } from './dog/dog-details/dog-details-confirm/dog-details-confirm.component';
import { DogComponent } from './dog/dog.component';
import { PedigreeComponent } from './dog/pedigree/pedigree.component';

import * as echarts from 'echarts/core';
import 'echarts/theme/macarons.js';

@NgModule({
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({ echarts }),
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'dog/:uuid', component: DogComponent, canActivate: [AuthGuard] },
      { path: 'dog/:uuid/pedigree', component: PedigreeComponent, canActivate: [AuthGuard] },
    ]),
    NgbModule,
    AuthModule.forRoot(environment.auth0),
    HttpClientModule,
    NgcCookieConsentModule.forRoot(cookies),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    AuthButtonComponent,
    SearchComponent,
    DogDetailsComponent,
    DogDetailsConfirmComponent,
    DogDetailsConfirmDialogComponent,
    DogComponent,
    PedigreeComponent,
    OffspringsComponent,
    TreeComponent,
    TreemapComponent,
    RadialComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ProgressbarInterceptor, multi: true },
  ],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
