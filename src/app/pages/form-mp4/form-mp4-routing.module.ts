import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormMp4Page } from './form-mp4.page';

const routes: Routes = [
  {
    path: '',
    component: FormMp4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormMp4PageRoutingModule {}
