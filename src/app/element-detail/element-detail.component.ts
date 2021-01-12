import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Element } from '../element';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-element-detail',
  templateUrl: './element-detail.component.html',
  styleUrls: [ './element-detail.component.css' ]
})
export class ElementDetailComponent implements OnInit {
  element: Element;

  constructor(
    private route: ActivatedRoute,
    private elementService: ElementService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getElement();
  }

  getElement(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.elementService.getElement(id)
      .subscribe(element => this.element = element);
  }

  goBack(): void {
    this.location.back();
  }
}