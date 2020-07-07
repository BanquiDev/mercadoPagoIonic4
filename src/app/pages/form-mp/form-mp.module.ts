import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormMpPageRoutingModule } from './form-mp-routing.module';

import { FormMpPage } from './form-mp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormMpPageRoutingModule
  ],
  declarations: [FormMpPage]
})
export class FormMpPageModule {}
