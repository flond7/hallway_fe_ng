import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/* VIEWS */
import { HomeComponent } from './views/home/home.component';
import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PegHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
