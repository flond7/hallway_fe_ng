import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { BsModalService } from 'ngx-bootstrap/modal';

/* GENERAL */
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

//import { AuthenticationInterceptor } from './authentication.interceptor'


/* PEG */
import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';
import { PegMenuComponent } from './components/peg/peg-menu/peg-menu.component';
import { PegPhaseRowComponent } from './components/peg/peg-phase-row/peg-phase-row.component';
import { PegNewGoalComponent } from './views/peg/peg-new-goal/peg-new-goal.component';
import { PegViewGoalComponent } from './views/peg/peg-view-goal/peg-view-goal.component';
import { PegViewUserComponent } from './views/peg/peg-view-user/peg-view-user.component';
import { PegViewYearComponent } from './views/peg/peg-view-year/peg-view-year.component';

import { AaNewAccessComponent } from './views/accessoAtti/aa-new-access/aa-new-access.component';
import { AaMenuComponent } from './components/accessoAtti/aa-menu/aa-menu.component';
import { AaListAccessComponent } from './views/accessoAtti/aa-list-access/aa-list-access.component';
import { AaListRowComponent } from './components/accessoAtti/aa-list-row/aa-list-row.component';

/* MODALS */
import { FeedbackModalComponent } from './components/modals/feedback-modal/feedback-modal.component';
import { PegGoalComponent } from './components/peg/peg-goal/peg-goal.component';
import { PegGoalTabComponent } from './components/peg/peg-goal-tab/peg-goal-tab.component';
import { PegViewReportsComponent } from './views/peg/peg-view-reports/peg-view-reports.component';
import { PegSearchForReportsComponent } from './components/peg/peg-search-for-reports/peg-search-for-reports.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PegHomeComponent,
    PegMenuComponent,
    PegPhaseRowComponent,
    PegNewGoalComponent,
    PegViewGoalComponent,
    PegViewUserComponent,
    PegViewYearComponent,
    AaNewAccessComponent,
    AaMenuComponent,
    AaListAccessComponent,
    AaListRowComponent,
    FeedbackModalComponent,
    LoginComponent,
    PegGoalComponent,
    PegGoalTabComponent,
    PegViewReportsComponent,
    PegSearchForReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgChartsModule,
    HttpClientXsrfModule,
  ],
  providers: [
    BsModalService, 
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor, // Add your interceptor here
      multi: true,
    }, */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }