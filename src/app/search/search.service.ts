import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Record } from './record';
import { SearchResult } from './search-result';


@Injectable({ providedIn: 'root' })
export class SearchService {

  private recordsUrl = 'http://localhost:4200/command/beaucerons/sql';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /* GET records whose name contains search term */
  searchRecords(term: string, limit=20): Observable<Record[]> {
    if (!term.trim()) {
      // if not search term, return empty record array.
      return of([]);
    }
    return this.http.post<SearchResult>(this.recordsUrl, "SELECT uuid, name, @CLASS FROM Named  WHERE SEARCH_CLASS('" + term + "') = true " + "limit " + limit, this.httpOptions)
    .pipe(
      map(value => value.result),
      tap(x => x.length ?
           this.log(`found records matching "${term}"`) :
           this.log(`no records matching "${term}"`)),
        catchError(this.handleError<Record[]>('searchRecords', []))    );
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
