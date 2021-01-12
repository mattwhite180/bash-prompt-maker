import { Component, OnInit } from '@angular/core';
import { Element } from '../element';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  elements: Element[] = [];

  constructor(private elementService: ElementService) { }

  ngOnInit() {
    this.getElements();
  }

  getElements(): void {
    this.elementService.getElements()
      .subscribe(elements => this.elements = elements.slice(1, 5));
  }
}