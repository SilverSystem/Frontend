import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { LogInComponent } from './components/log-in/log-in.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConfirmPasswordRecoveryComponent } from './components/confirm-password-recovery/confirm-password-recovery.component';
const PAGES = [
  AuthPage,
  LogInComponent,
  ChangePasswordComponent,
  ConfirmPasswordRecoveryComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule
  ],
  declarations: [...PAGES]
})
export class AuthPageModule {}
