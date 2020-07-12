import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Form3MpPage } from './form3-mp.page';

const routes: Routes = [
  {
    path: '',
    component: Form3MpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Form3MpPageRoutingModule {}
