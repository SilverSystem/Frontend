import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { LogInComponent } from './components/log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children:[
      {
        path: '',
        component: LogInComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
