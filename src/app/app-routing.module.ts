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
    path: 'form-js',
    loadChildren: () => import('./pages/form-js/form-js.module').then( m => m.FormJsPageModule)
  },
  {
    path: 'form-mp2',
    loadChildren: () => import('./pages/form-mp2/form-mp2.module').then( m => m.FormMp2PageModule)
  },
  {
    path: 'form-mp3',
    loadChildren: () => import('./pages/form-mp3/form-mp3.module').then( m => m.FormMp3PageModule)
  },  {
    path: 'form-mp4',
    loadChildren: () => import('./pages/form-mp4/form-mp4.module').then( m => m.FormMp4PageModule)
  }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
