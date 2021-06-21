import { User } from './user';
import { environment } from '../../environments/environment.prod';
import { tap, catchError, finalize, switchMap } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';
import { BackendService } from '../backend.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl = environment.auth0.audience;

  constructor(
    private auth: AuthService,
    private backend: BackendService,
    private http: HttpClient
  ) {
    const user$ = auth.user$.pipe(
      switchMap((user) => {
        return this.getUserData(user?.sub);
      })
    );
    user$.subscribe((user) => {
      if (user) {
        console.log(user);
        if (user.user_metadata && user.user_metadata.uuid) {
          console.log('found returning user');
        } else {
          let term: string | undefined;
          if (user.family_name) {
            term = user.family_name;
          } else {
            term = user.name;
          }
          backend
            .searchUsers(term, 20)
            .subscribe((users) =>
              console.log(`users matching "${term}"`, users)
            );
        }
      }
    });
  }

  /* GET users whose name contains search term */
  private getUserData(sub?: string): Observable<User> {
    if (sub && !sub.trim()) {
      // if not search term, return empty record array.
      return of();
    }
    return this.http
      .get<User>(`${this.backendUrl}users/${sub}`, this.httpOptions)
      .pipe(
        tap((x) =>
          x
            ? this.log(`getUserData: found user matching "${sub}"`)
            : this.log(`getUserData: no user matching "${sub}"`)
        ),
        catchError(this.handleError<User>('getUserData', undefined))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RecordService message with the MessageService */
  private log(message: string) {
    console.log(`BackendService: ${message}`);
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
}
