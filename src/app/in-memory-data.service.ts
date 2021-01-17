import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Element } from './element';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    let start: string = '\\' + '[\\' + 'e[';
  let color: string = "37";
  let end: string = 'm\\' + ']'

    const elements = [
  { id: 11, name: 'working-dir', value: start + color + end + '\\w', color: "white", view: "~/" },
    { id: 12, name: 'hostname', value: start + color + end + '\\h', color: "white", view: "ubuntu" },
    { id: 13, name: 'date', value: start + color + end + '\\d', color: "white", view: "OCT 31" },
    { id: 14, name: 'prompt', value: ':)', color: "white", view: "[$]" },
    { id: 14, name: 'username', value: 'usr', color: "white", view: "user" },
    { id: 14, name: '@', value: '@', color: "white", view: "@" },
    ];
    return {elements};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the elements array is empty,
  // the method below returns the initial number (11).
  // if the elements array is not empty, the method below returns the highest
  // hero id + 1.
  genId(elements: Element[]): number {
    return elements.length > 0 ? Math.max(...elements.map(element => element.id)) + 1 : 11;
  }
}