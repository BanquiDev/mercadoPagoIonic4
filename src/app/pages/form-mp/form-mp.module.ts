import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormMpPageRoutingModule } from './form-mp-routing.module';

import { FormMpPage } from './form-mp.page';
import { ComponentsModuleModule } from '../../components/components-module/components-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormMpPageRoutingModule,
    ComponentsModuleModule
  ],
  declarations: [FormMpPage]
})
export class FormMpPageModule {}
