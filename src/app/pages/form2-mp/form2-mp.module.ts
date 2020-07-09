import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Form2MpPageRoutingModule } from './form2-mp-routing.module';

import { Form2MpPage } from './form2-mp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Form2MpPageRoutingModule
  ],
  declarations: [Form2MpPage]
})
export class Form2MpPageModule {}
