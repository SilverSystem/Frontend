import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { ContentLoaderComponent } from './content-loader/content-loader.component';
import { InDevelopmentComponent } from './in-development/in-development.component';
const LAYOUT_COMPONENTS = [
  NavbarComponent,
  MenuComponent,
  ContentLoaderComponent,
  InDevelopmentComponent
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
