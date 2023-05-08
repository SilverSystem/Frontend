import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
const LAYOUT_COMPONENTS = [
  NavbarComponent,
  MenuComponent
];


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [...LAYOUT_COMPONENTS],
  declarations: [...LAYOUT_COMPONENTS],
})
export class LayoutModule { }
