import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstruccionPage } from './construccion.page';
import { DashboardFichasComponent } from './components/dashboard-fichas/dashboard-fichas.component';
import { FichaDetailComponent } from './components/ficha-detail/ficha-detail.component';
import { SignUpComponent } from '../auth/components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: ConstruccionPage,
    children: [
      {
        path:'',
        component:DashboardFichasComponent
      },
      {
        path: ':fichaID',
        component: FichaDetailComponent
      },
      {
        path:'registrar-usuario',
        component: SignUpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstruccionPageRoutingModule {}
