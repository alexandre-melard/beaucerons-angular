import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Record } from './record';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  filteredRecords$: Observable<Record[]> | undefined;
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private searchService: BackendService) {}

  ngOnInit() {
    this.filteredRecords$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) =>
        this.searchService.searchRecords(this._normalizeValue(term))
      )
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(this._normalizeValue(term));
  }

  goToRoute(record: any): void {
    console.log(record);
    switch (record.type) {
      case 'Breeder':
        this.router.navigate([`/breeder/${record.uuid}`]);
        break;
      case 'Owner':
        this.router.navigate([`/owner/${record.uuid}`]);
        break;
      default:
        this.router.navigate([`/dog/${record.uuid}`]);
        break;
    }
  }

  displayRecord(record: Record): string {
    return record && record.name ? record.name : '';
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().trim();
  }
}
