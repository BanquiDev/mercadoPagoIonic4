import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormJsPage } from './form-js.page';

const routes: Routes = [
  {
    path: '',
    component: FormJsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormJsPageRoutingModule {}
