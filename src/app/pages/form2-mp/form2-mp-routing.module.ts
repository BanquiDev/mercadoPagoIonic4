import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Form2MpPage } from './form2-mp.page';

const routes: Routes = [
  {
    path: '',
    component: Form2MpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Form2MpPageRoutingModule {}
