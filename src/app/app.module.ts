import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ElementsComponent } from './elements/elements.component';
import { ElementDetailComponent } from './element-detail/element-detail.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementsComponent,
    ElementDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }