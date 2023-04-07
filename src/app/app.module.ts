import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

/* VIEWS */
import { HomeComponent } from './views/home/home.component';
import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';
import { PegMenuComponent } from './components/peg/peg-menu/peg-menu.component';
import { PegPhaseRowComponent } from './components/peg/peg-phase-row/peg-phase-row.component';
import { PegGoalGroupComponent } from './components/peg/peg-goal-group/peg-goal-group.component';
import { PegNewGoalComponent } from './views/peg/peg-new-goal/peg-new-goal.component';
import { PegViewGoalComponent } from './views/peg/peg-view-goal/peg-view-goal.component';
import { PegViewUserComponent } from './views/peg/peg-view-user/peg-view-user.component';
import { PegViewYearComponent } from './views/peg/peg-view-year/peg-view-year.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PegHomeComponent,
    PegMenuComponent,
    PegPhaseRowComponent,
    PegGoalGroupComponent,
    PegNewGoalComponent,
    PegViewGoalComponent,
    PegViewUserComponent,
    PegViewYearComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
