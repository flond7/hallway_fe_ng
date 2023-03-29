import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';

import { PegViewYearComponent  } from './views/peg/peg-view-year/peg-view-year.component';
import { PegViewGoalComponent } from './views/peg/peg-view-goal/peg-view-goal.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'peg-home', component: PegHomeComponent },
  { path: 'peg-view-goal', component: PegViewGoalComponent },
  { path: 'peg-view-year', component: PegViewYearComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
