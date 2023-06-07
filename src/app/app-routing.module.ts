import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InDevelopmentComponent } from './layout/in-development/in-development.component';
import { AuthGuard } from './core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'construccion',
    canLoad: [AuthGuard],
    loadChildren: () => import('./construccion/construccion.module').then( m => m.ConstruccionPageModule)
  },
  {
    path: '**',
    component: InDevelopmentComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
