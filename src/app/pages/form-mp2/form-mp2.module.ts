import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormMp2PageRoutingModule } from './form-mp2-routing.module';

import { FormMp2Page } from './form-mp2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormMp2PageRoutingModule
  ],
  declarations: [FormMp2Page]
})
export class FormMp2PageModule {}
