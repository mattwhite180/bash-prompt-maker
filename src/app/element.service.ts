import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Element } from './element';
import { ELEMENTS } from './mock-elements';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ElementService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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


  private elementsUrl = 'api/elements';

  //constructor(private messageService: MessageService) { }
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  

  getElements(): Observable<Element[]> {
    return this.http.get<Element[]>(this.elementsUrl)
    .pipe(
      tap(_ => this.log('fetched elements')),
      catchError(this.handleError<Element[]>('getElements', []))
    );
  }

  getElement(id: number): Observable<Element> {
    const url = `${this.elementsUrl}/${id}`;
    return this.http.get<Element>(url).pipe(
      tap(_ => this.log(`fetched element id=${id}`)),
      catchError(this.handleError<Element>(`getElements id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`ElementService: ${message}`);
  }

  updateElement(element: Element): Observable<any> {
    return this.http.put(this.elementsUrl, element, this.httpOptions).pipe(
      tap(_ => this.log(`updated element id=${element.id}`)),
      catchError(this.handleError<any>('updateElement'))
    );
  }

  addElement(element: Element): Observable<Element> {
    return this.http.post<Element>(this.elementsUrl, element, this.httpOptions).pipe(
      tap((newElement: Element) => this.log(`added element w/ id=${newElement.id}`)),
      catchError(this.handleError<Element>('addElement'))
    );
  }
}