import { Component, OnInit } from '@angular/core';

import { Element } from '../element';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  elements: Element[];

  constructor(private elementService: ElementService) { }

  ngOnInit() {
    this.getElements();
  }

  getElements(): void {
    this.elementService.getElements()
    .subscribe(elements => this.elements = elements);
  }
}