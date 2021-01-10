import { Component, OnInit } from '@angular/core';
import { Element } from '../element';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  element: Element = {
    id: 1,
    name: 'date',
    value: '#date',
    color: 'white'
  }

  constructor() { }

  ngOnInit() {
  }

}
