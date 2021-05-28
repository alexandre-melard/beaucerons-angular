import { DogResult } from './model/dog-result';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Record } from './search/record';
import { SearchResult } from './search/search-result';
import { Dog } from './model/dog';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private backendUrl = environment.backend.url;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /* GET dog with ancesters matching uuid */
  getDogAncesters(uuid: string, depth=5): Observable<Dog[]> {
    if (!uuid.trim()) {
      // if not search term, return empty record array.
      console.log(`uuid is empty(${uuid})`);
      return of();
    }
    console.debug(`post select: ${uuid} on url: ${this.backendUrl}`);

    return this.http
      .post<DogResult>(
        this.backendUrl,
        `select @rid, name, uuid, @class, in_Parent from (TRAVERSE in('Parent') FROM (select from Dog where uuid='${uuid}') MAXDEPTH ${depth})`,
        this.httpOptions
      )
      .pipe(
        map((value) => value.result),
        tap((x) =>
          x
            ? this.log(`found dog matching "${uuid}"`)
            : this.log(`no dog matching "${uuid}"`)
        ),
        catchError(this.handleError<Dog[]>(`getDog id=${uuid}`))
      );
  }

  /* GET dog with parents matching uuid */
  getDogAndParents(uuid: string, limit = 20): Observable<Dog[]> {
    if (!uuid.trim()) {
      // if not search term, return empty record array.
      console.log(`uuid is empty(${uuid})`);
      return of();
    }
    console.debug(`post select: ${uuid} on url: ${this.backendUrl}`);

    return this.http
      .post<DogResult>(
        this.backendUrl,
        `select @RID as id, @CLASS as type, name, uuid, ship, tattoo, cotation, dob, color, other from (traverse in('Parent') from (select @RID from Dog where uuid='${uuid}') while $depth < 2)`,
        this.httpOptions
      )
      .pipe(
        map((value) => value.result),
        tap((x) =>
          x
            ? this.log(`found dog matching "${uuid}"`)
            : this.log(`no dog matching "${uuid}"`)
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
    console.debug(`post select: ${uuid} on url: ${this.backendUrl}`);

    return this.http
      .post<DogResult>(
        this.backendUrl,
        `SELECT @RID as id, @CLASS as type, name, uuid, ship, tattoo, cotation, dob, color, other FROM Dog  WHERE uuid = '${uuid}' limit ${limit}`,
        this.httpOptions
      )
      .pipe(
        map((value) => value.result),
        map((values) => values[0]),
        tap((x) =>
          x
            ? this.log(`found dog matching "${uuid}"`)
            : this.log(`no dog matching "${uuid}"`)
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
      .post<SearchResult>(
        this.backendUrl,
        `SELECT uuid, name, @CLASS as type FROM Named  WHERE SEARCH_CLASS('${term}') = true limit ${limit}`,
        this.httpOptions
      )
      .pipe(
        map((value) => value.result),
        tap((x) =>
          x.length
            ? this.log(`found records matching "${term}"`)
            : this.log(`no records matching "${term}"`)
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
    console.log(`RecordService: ${message}`);
  }
}
