import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';
import { PegViewGoalComponent } from './views/peg/peg-view-goal/peg-view-goal.component';
import { PegViewReportsComponent } from './views/peg/peg-view-reports/peg-view-reports.component';
import { PegNewGoalComponent } from './views/peg/peg-new-goal/peg-new-goal.component';
import { PegReportPersonComponent } from './views/peg/peg-report-person/peg-report-person.component';
import { PegReportOfficeComponent } from './views/peg/peg-report-office/peg-report-office.component';
import { PegInstructionsComponent } from './views/peg/peg-instructions/peg-instructions.component';
import { PegEditComponent } from './views/peg/peg-edit/peg-edit.component';

import { AaNewAccessComponent } from './views/accessoAtti/aa-new-access/aa-new-access.component';
import { AaListAccessComponent } from './views/accessoAtti/aa-list-access/aa-list-access.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  { path: 'peg-home', component: PegHomeComponent },
  //{ path: 'peg-view-reports', component: PegViewReportsComponent },
  { path: 'peg-new-goal', component: PegNewGoalComponent },
  { path: 'peg-edit', component: PegNewGoalComponent },
  { path: 'peg-report-person', component: PegReportPersonComponent },
  { path: 'peg-report-office', component: PegReportOfficeComponent },
  { path: 'peg-instructions', component: PegInstructionsComponent },
  //{ path: 'peg-edit', component: PegEditComponent },

  { path: 'aa-new-access', component: AaNewAccessComponent },
  { path: 'aa-list-access', component: AaListAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
