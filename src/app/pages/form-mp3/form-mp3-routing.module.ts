import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormMp3Page } from './form-mp3.page';

const routes: Routes = [
  {
    path: '',
    component: FormMp3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormMp3PageRoutingModule {}
