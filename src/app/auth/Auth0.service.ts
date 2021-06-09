import { environment } from './../../environments/environment';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  private jwtHelper!: JwtHelperService;
  private accessToken?: string;

  constructor(private auth: AuthService, private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      skipAuth0Interceptor: 'true',
    }),
  };

  /**
   * if user authenticated
   *  -> YES: use it
   *  -> NO: is token present and valid?
   *     -> YES: use it
   *     -> NO: request a M2M token
   */
  getAccessToken(publicAccess: boolean): Observable<string> {
    return this.auth.isAuthenticated$.pipe(
      mergeMap((authenticated) => {
        let accessToken$: Observable<string>;
        if (publicAccess) {
          if (authenticated) {
            console.debug('Auth0Service:getAccessToken user is authenticated');
            accessToken$ = this.auth.getAccessTokenSilently();
          } else {
            if (
              this.accessToken &&
              !this.jwtHelper.isTokenExpired(this.accessToken)
            ) {
              console.debug(
                'Auth0Service:getAccessToken user is authenticated and has a valid token'
              );
              accessToken$ = of(this.accessToken);
            } else {
              accessToken$ = this.http
                .post<any>(
                  environment.auth.url,
                  `{"client_id":"${environment.auth.clientId}","client_secret":"${environment.auth.clientSecret}","audience":"${environment.auth.audience}","grant_type":"${environment.auth.grantType}"}`,
                  this.httpOptions
                )
                .pipe(
                  map((r: any) => {
                    return (this.accessToken = r.access_token);
                  })
                );
            }
          }
        } else {
          if (authenticated) {
            accessToken$ = this.auth.getAccessTokenSilently();
          } else {
            console.error(
              'Auth0Service:getAccessToken You are trying to access a restricted area, you need to be authenticated!'
            );
            accessToken$ = of('Unauthorized');
          }
        }
        return accessToken$;
      })
    );
  }
}
