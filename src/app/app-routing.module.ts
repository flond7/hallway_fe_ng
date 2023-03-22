import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { PegHomeComponent } from './views/peg/peg-home/peg-home.component';
import { PegGoalViewComponent  } from './views/peg/peg-goal-view/peg-goal-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'peg-home', component: PegHomeComponent },
  { path: 'peg-goal-view', component: PegGoalViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
