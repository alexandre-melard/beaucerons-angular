import { SearchService } from './search.service';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Record } from './record';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    filteredRecords$!: Observable<Record[]>;
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.filteredRecords$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchRecords(this._normalizeValue(term))),
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(this._normalizeValue(term));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().trim();
  }
}
