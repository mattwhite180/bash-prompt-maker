import { Component, OnInit } from '@angular/core';
import { Element } from '../element';
import { ELEMENTS } from '../mock-elements';
import { ElementService } from '../element.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  selectedElement: Element;

  elements: Element[];

  constructor(private elementService: ElementService, private messageService: MessageService) { }

  ngOnInit() {
    this.getElements();
  }

  onSelect(element: Element): void {
    this.selectedElement = element;
    this.messageService.add(`ElementsComponent: Selected element id=${element.id}`);
  }

  getElements(): void {
    this.elementService.getElements()
        .subscribe(elements => this.elements = elements);
  }
}