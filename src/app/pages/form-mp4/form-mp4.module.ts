import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormMp4PageRoutingModule } from './form-mp4-routing.module';

import { FormMp4Page } from './form-mp4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormMp4PageRoutingModule
  ],
  declarations: [FormMp4Page]
})
export class FormMp4PageModule {}
