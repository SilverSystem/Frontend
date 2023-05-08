import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConstruccionPageRoutingModule } from './construccion-routing.module';

import { ConstruccionPage } from './construccion.page';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstruccionPageRoutingModule,
    LayoutModule
  ],
  declarations: [ConstruccionPage]
})
export class ConstruccionPageModule {}
