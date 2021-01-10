import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ElementsComponent } from './elements/elements.component';
import { ElementDetailComponent } from './element-detail/element-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementsComponent,
    ElementDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }