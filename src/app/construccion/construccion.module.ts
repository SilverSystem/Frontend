import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '@webed/angular-tooltip';
import { IonicModule } from '@ionic/angular';

import { ConstruccionPageRoutingModule } from './construccion-routing.module';

import { ConstruccionPage } from './construccion.page';
import { LayoutModule } from '../layout/layout.module';
import { DashboardFichasComponent } from './components/dashboard-fichas/dashboard-fichas.component';

const CONSTUCCION_COMPONENTS = [
  ConstruccionPage,
  DashboardFichasComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstruccionPageRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  declarations: [...CONSTUCCION_COMPONENTS]
})
export class ConstruccionPageModule {}
