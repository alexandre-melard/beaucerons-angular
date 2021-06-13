import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  constructor(private auth: AuthService) {}

  /**
   * if user authenticated
   *  -> YES: use it
   *  -> NO: is token present and valid?
   *     -> YES: use it
   *     -> NO: request a M2M token
   */
  getAccessToken(): Observable<string> {
    return this.auth.isAuthenticated$.pipe(
      mergeMap((authenticated) => {
        let accessToken$: Observable<string>;
        if (authenticated) {
          accessToken$ = this.auth.getAccessTokenSilently();
        } else {
          console.error(
            'Auth0Service:getAccessToken You are trying to access a restricted area, you need to be authenticated!'
          );
          accessToken$ = of('Unauthorized');
        }
        return accessToken$;
      })
    );
  }
}
