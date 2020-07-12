import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Form3MpPageRoutingModule } from './form3-mp-routing.module';

import { Form3MpPage } from './form3-mp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Form3MpPageRoutingModule
  ],
  declarations: [Form3MpPage]
})
export class Form3MpPageModule {}
