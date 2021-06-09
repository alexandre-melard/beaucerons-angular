import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Record } from './search/record';
import { Dog } from './dog/dog';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private backendUrl = environment.backend.url;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'beauceronsApi': 'true',
      'publicApi': 'true'
    }),
  };

  constructor(private http: HttpClient) {}

  /* GET dog with ancesters matching uuid */
  getDogOffsprings(uuid: string, depth = 3): Observable<Dog> {
    if (!uuid.trim()) {
      // if not search term, return empty record array.
      console.log(`uuid is empty(${uuid})`);
      return of();
    }
    console.debug(`post select: ${uuid} on url: ${this.backendUrl}/gremlin`);
    return this.http
      .get<Dog>(
        `${this.backendUrl}/api/dog/${uuid}/offsprings/${depth}`,
        this.httpOptions
      )
      .pipe(
        tap((x) =>
          x
            ? this.log(`getDogPedigree: found dog matching "${uuid}"`)
            : this.log(`getDogPedigree: no dog matching "${uuid}"`)
        ),
        catchError(this.handleError<Dog>(`getDog id=${uuid}`))
      );
  }
  /* GET dog with ancesters matching uuid */
  getDogPedigree(uuid: string, depth = 5): Observable<Dog> {
    if (!uuid.trim()) {
      // if not search term, return empty record array.
      console.log(`uuid is empty(${uuid})`);
      return of();
    }
    console.debug(`post select: ${uuid} on url: ${this.backendUrl}/gremlin`);
    return this.http
      .get<Dog>(
        `${this.backendUrl}/api/dog/${uuid}/pedigree/${depth}`,
        this.httpOptions
      )
      .pipe(
        tap((x) =>
          x
            ? this.log(`getDogPedigree: found dog matching "${uuid}"`)
            : this.log(`getDogPedigree: no dog matching "${uuid}"`)
        ),
        catchError(this.handleError<Dog>(`getDog id=${uuid}`))
      );
  }

  /* GET dog with parents matching uuid */
  getDogParents(uuid: string): Observable<Dog[]> {
    if (!uuid.trim()) {
      // if not search term, return empty record array.
      console.log(`uuid is empty(${uuid})`);
      return of();
    }
    return this.http
      .get<Dog[]>(
        `${this.backendUrl}/api/dog/${uuid}/parents`,
        this.httpOptions
      )
      .pipe(
        tap((x) =>
          x
            ? this.log(`getDogAndParents: found dog matching "${uuid}"`)
            : this.log(`getDogAndParents: no dog matching "${uuid}"`)
        ),
        catchError(this.handleError<Dog[]>(`getDog id=${uuid}`))
      );
  }

  /* GET dog matching uuid */
  getDog(uuid: string, limit = 20): Observable<Dog> {
    if (!uuid.trim()) {
      // if not search term, return empty record array.
      console.log(`uuid is empty(${uuid})`);
      return of();
    }
    return this.http
      .get<Dog>(
        `${this.backendUrl}/api/dog/${uuid}`,
        this.httpOptions
      )
      .pipe(
        tap((x) =>
          x
            ? this.log(`getDog: found dog matching "${uuid}"`)
            : this.log(`getDog: no dog matching "${uuid}"`)
        ),
        catchError(this.handleError<Dog>(`getDog id=${uuid}`))
      );
  }

  /* GET records whose name contains search term */
  searchRecords(term: string, limit = 20): Observable<Record[]> {
    if (!term.trim()) {
      // if not search term, return empty record array.
      return of([]);
    }
    return this.http
      .post<Record[]>(
        `${this.backendUrl}/api/search/${limit}/${term}`,
        this.httpOptions
      )
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`searchRecords: found records matching "${term}"`)
            : this.log(`searchRecords: no records matching "${term}"`)
        ),
        catchError(this.handleError<Record[]>('searchRecords', []))
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
}
