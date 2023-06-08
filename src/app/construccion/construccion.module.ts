import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '@webed/angular-tooltip';
import { IonicModule } from '@ionic/angular';

import { ConstruccionPageRoutingModule } from './construccion-routing.module';

import { ConstruccionPage } from './construccion.page';
import { LayoutModule } from '../layout/layout.module';
import { DashboardFichasComponent } from './components/dashboard-fichas/dashboard-fichas.component';
import { FichaDetailComponent } from './components/ficha-detail/ficha-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MapaAprendizajeComponent } from './components/mapa-aprendizaje/mapa-aprendizaje.component';
import { EstrategiasMetodologicasComponent } from './components/estrategias-metodologicas/estrategias-metodologicas.component';
import { GuiaEvaluacionComponent } from './components/guia-evaluacion/guia-evaluacion.component';
import { RecursosEspaciosFormacionComponent } from './components/recursos-espacios-formacion/recursos-espacios-formacion.component';
import { SignUpComponent } from '../auth/components/sign-up/sign-up.component';
import { RejectionReasonModalComponent } from
'./components/ficha-detail/components/rejection-reason-modal/rejection-reason-modal.component';

const CONSTRUCCION_COMPONENTS = [
  ConstruccionPage,
  DashboardFichasComponent,
  FichaDetailComponent,
  MapaAprendizajeComponent,
  EstrategiasMetodologicasComponent,
  GuiaEvaluacionComponent,
  RecursosEspaciosFormacionComponent,
  RejectionReasonModalComponent,
  SignUpComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstruccionPageRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    TooltipModule,
    NgxPaginationModule
  ],
  declarations: [...CONSTRUCCION_COMPONENTS]
})
export class ConstruccionPageModule {}
