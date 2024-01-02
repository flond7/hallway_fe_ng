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

/* MODALS */
import { FeedbackModalComponent } from './components/modals/feedback-modal/feedback-modal.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';

//import { AuthenticationInterceptor } from './authentication.interceptor'

/* AA */
import { AaNewAccessComponent } from './views/accessoAtti/aa-new-access/aa-new-access.component';
import { AaMenuComponent } from './components/accessoAtti/aa-menu/aa-menu.component';
import { AaListAccessComponent } from './views/accessoAtti/aa-list-access/aa-list-access.component';
import { AaListRowComponent } from './components/accessoAtti/aa-list-row/aa-list-row.component';

/* PEG */
import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';
import { PegMenuComponent } from './components/peg/peg-menu/peg-menu.component';
import { PegPhaseRowComponent } from './components/peg/peg-phase-row/peg-phase-row.component';
import { PegNewGoalComponent } from './views/peg/peg-new-goal/peg-new-goal.component';
import { PegGoalComponent } from './components/peg/peg-goal/peg-goal.component';
import { PegGoalTabComponent } from './components/peg/peg-goal-tab/peg-goal-tab.component';
import { PegSearchForReportsComponent } from './components/peg/peg-search-for-reports/peg-search-for-reports.component';
import { PegReportGoalListComponent } from './components/peg/peg-report-goal-list/peg-report-goal-list.component';
import { PegCardComponent } from './components/peg/peg-card/peg-card.component';
import { PegReportPersonComponent } from './views/peg/peg-report-person/peg-report-person.component';
import { PegGoalReportComponent } from './components/peg/peg-goal-report/peg-goal-report.component';
import { PegReportOfficeComponent } from './views/peg/peg-report-office/peg-report-office.component';
import { PegUserCardComponent } from './components/peg/peg-user-card/peg-user-card.component';
import { PegInstructionsComponent } from './views/peg/peg-instructions/peg-instructions.component';
import { PegCardHorizontalComponent } from './components/peg/peg-card-horizontal/peg-card-horizontal.component';
import { UtentiHomeComponent } from './views/utenti/utenti-home/utenti-home.component';
import { UtentiNewComponent } from './views/utenti/utenti-new/utenti-new.component';
import { UtentiDetailComponent } from './views/utenti/utenti-detail/utenti-detail.component';
import { UtentiMenuComponent } from './components/utenti/utenti-menu/utenti-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FeedbackModalComponent,
    DeleteModalComponent,  
    AaNewAccessComponent,
    AaMenuComponent,
    AaListAccessComponent,
    AaListRowComponent,
    PegHomeComponent,
    PegMenuComponent,
    PegPhaseRowComponent,
    PegNewGoalComponent,
    PegGoalComponent,
    PegGoalTabComponent,
    PegSearchForReportsComponent,
    PegReportGoalListComponent,
    PegCardComponent,
    PegReportPersonComponent,
    PegGoalReportComponent,
    PegReportOfficeComponent,
    PegUserCardComponent,
    PegInstructionsComponent,
    PegCardHorizontalComponent,
    UtentiHomeComponent,
    UtentiNewComponent,
    UtentiDetailComponent,
    UtentiMenuComponent,
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