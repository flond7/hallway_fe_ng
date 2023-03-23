import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/* VIEWS */
import { HomeComponent } from './views/home/home.component';
import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';
import { PegGoalViewComponent } from './views/peg/peg-goal-view/peg-goal-view.component';
import { PegMenuComponent } from './components/peg/peg-menu/peg-menu.component';
import { PegPhaseRowComponent } from './components/peg/peg-phase-row/peg-phase-row.component';
import { PegYearViewComponent } from './views/peg/peg-year-view/peg-year-view.component';
import { PegUserViewComponent } from './views/peg/peg-user-view/peg-user-view.component';
import { PegGoalGroupComponent } from './components/peg/peg-goal-group/peg-goal-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PegHomeComponent,
    PegGoalViewComponent,
    PegMenuComponent,
    PegPhaseRowComponent,
    PegYearViewComponent,
    PegUserViewComponent,
    PegGoalGroupComponent,
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
