import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Element } from './element';
import { ELEMENTS } from './mock-elements';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ElementService {

  constructor(private messageService: MessageService) { }

  getElements(): Observable<Element[]> {
    // TODO: send the message _after_ fetching the elements
    this.messageService.add('ElementService: fetched elements');
    return of(ELEMENTS);
  }
}