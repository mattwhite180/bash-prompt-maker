import { Component, OnInit } from '@angular/core';
import { Element } from '../element';
import { ELEMENTS } from '../mock-elements';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  elements = ELEMENTS;
  selectedElement: Element;

  constructor() { }

  ngOnInit() {
  }

  onSelect(element: Element): void {
    this.selectedElement = element;
  }
}