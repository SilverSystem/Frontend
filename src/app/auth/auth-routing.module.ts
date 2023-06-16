import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { LogInComponent } from './components/log-in/log-in.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConfirmPasswordRecoveryComponent } from './components/confirm-password-recovery/confirm-password-recovery.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children:[
      {
        path: '',
        component: LogInComponent
      },
      {
        path: 'cambiar-contraseña',
        component: ChangePasswordComponent
      },
      {
        path: 'confirmar-recuperacion',
        component: ConfirmPasswordRecoveryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
