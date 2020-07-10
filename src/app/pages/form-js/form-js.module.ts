import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormJsPageRoutingModule } from './form-js-routing.module';

import { FormJsPage } from './form-js.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormJsPageRoutingModule
  ],
  declarations: [FormJsPage]
})
export class FormJsPageModule {}
