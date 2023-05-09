import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstruccionPage } from './construccion.page';
import { DashboardFichasComponent } from './components/dashboard-fichas/dashboard-fichas.component';

const routes: Routes = [
  {
    path: '',
    component: ConstruccionPage,
    children: [
      {
        path:'',
        component:DashboardFichasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstruccionPageRoutingModule {}
