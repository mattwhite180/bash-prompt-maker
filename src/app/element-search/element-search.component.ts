import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Element } from '../element';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-element-search',
  templateUrl: './element-search.component.html',
  styleUrls: [ './element-search.component.css' ]
})
export class ElementSearchComponent implements OnInit {
  elements$: Observable<Element[]>;
  private searchTerms = new Subject<string>();

  constructor(private elementService: ElementService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.elements$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.elementService.searchElements(term)),
    );
  }
}