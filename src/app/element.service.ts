import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Element } from './element';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ElementService {

  private elementsUrl = 'api/elements';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET elements from the server */
  getElements(): Observable<Element[]> {
    return this.http.get<Element[]>(this.elementsUrl)
      .pipe(
        tap(_ => this.log('fetched elements')),
        catchError(this.handleError<Element[]>('getElements', []))
      );
  }

  /** GET element by id. Return `undefined` when id not found */
  getElementNo404<Data>(id: number): Observable<Element> {
    const url = `${this.elementsUrl}/?id=${id}`;
    return this.http.get<Element[]>(url)
      .pipe(
        map(elements => elements[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} element id=${id}`);
        }),
        catchError(this.handleError<Element>(`getElement id=${id}`))
      );
  }

  /** GET element by id. Will 404 if id not found */
  getElement(id: number): Observable<Element> {
    const url = `${this.elementsUrl}/${id}`;
    return this.http.get<Element>(url).pipe(
      tap(_ => this.log(`fetched element id=${id}`)),
      catchError(this.handleError<Element>(`getElement id=${id}`))
    );
  }

  /* GET elements whose name contains search term */
  searchElements(term: string): Observable<Element[]> {
    if (!term.trim()) {
      // if not search term, return empty element array.
      return of([]);
    }
    return this.http.get<Element[]>(`${this.elementsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found elements matching "${term}"`) :
         this.log(`no elements matching "${term}"`)),
      catchError(this.handleError<Element[]>('searchElements', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new element to the server */
  addElement(element: Element): Observable<Element> {
    return this.http.post<Element>(this.elementsUrl, element, this.httpOptions).pipe(
      tap((newElement: Element) => this.log(`added element w/ id=${newElement.id}`)),
      catchError(this.handleError<Element>('addElement'))
    );
  }

  /** DELETE: delete the element from the server */
  deleteElement(element: Element | number): Observable<Element> {
    const id = typeof element === 'number' ? element : element.id;
    const url = `${this.elementsUrl}/${id}`;

    return this.http.delete<Element>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted element id=${id}`)),
      catchError(this.handleError<Element>('deleteElement'))
    );
  }

  /** PUT: update the element on the server */
  updateElement(element: Element): Observable<any> {
    return this.http.put(this.elementsUrl, element, this.httpOptions).pipe(
      tap(_ => this.log(`updated element id=${element.id}`)),
      catchError(this.handleError<any>('updateElement'))
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

  /** Log a ElementService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ElementService: ${message}`);
  }
}