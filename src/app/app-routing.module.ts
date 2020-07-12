import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'form-mp',
    loadChildren: () => import('./pages/form-mp/form-mp.module').then( m => m.FormMpPageModule)
  },
  {
    path: 'form2-mp',
    loadChildren: () => import('./pages/form2-mp/form2-mp.module').then( m => m.Form2MpPageModule)
  },
  {
    path: 'form-js',
    loadChildren: () => import('./pages/form-js/form-js.module').then( m => m.FormJsPageModule)
  },
  {
    path: 'form3-mp',
    loadChildren: () => import('./pages/form3-mp/form3-mp.module').then( m => m.Form3MpPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
