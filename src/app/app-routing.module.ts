import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';
import { PegNewGoalComponent } from './views/peg/peg-new-goal/peg-new-goal.component';
import { PegReportPersonComponent } from './views/peg/peg-report-person/peg-report-person.component';
import { PegReportOfficeComponent } from './views/peg/peg-report-office/peg-report-office.component';
import { PegInstructionsComponent } from './views/peg/peg-instructions/peg-instructions.component';

import { AaNewAccessComponent } from './views/accessoAtti/aa-new-access/aa-new-access.component';
import { AaListAccessComponent } from './views/accessoAtti/aa-list-access/aa-list-access.component';


import { UtentiHomeComponent } from './views/utenti/utenti-home/utenti-home.component';
import { UtentiDetailComponent } from './views/utenti/utenti-detail/utenti-detail.component';
import { UtentiNewComponent } from './views/utenti/utenti-new/utenti-new.component';
import { UNewComponent } from './views/utenti/u-new/u-new.component';
import { UAskComponent } from './views/utenti/u-ask/u-ask.component';
import { UDetailComponent } from './views/utenti/u-detail/u-detail.component';
import { UListComponent } from './views/utenti/u-list/u-list.component';
import { UHomeComponent } from './views/utenti/u-home/u-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  { path: 'peg-home', component: PegHomeComponent },
  { path: 'peg-new-goal', component: PegNewGoalComponent },
  { path: 'peg-edit', component: PegNewGoalComponent },
  { path: 'peg-report-person', component: PegReportPersonComponent },
  { path: 'peg-report-office', component: PegReportOfficeComponent },
  { path: 'peg-instructions', component: PegInstructionsComponent },

  { path: 'aa-new-access', component: AaNewAccessComponent },
  { path: 'aa-list-access', component: AaListAccessComponent },

  { path: 'users-home', component: UHomeComponent },
  { path: 'users-detail', component: UDetailComponent },
  { path: 'users-new', component: UNewComponent },
  { path: 'users-ask', component: UAskComponent },
  { path: 'users-list', component: UListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
