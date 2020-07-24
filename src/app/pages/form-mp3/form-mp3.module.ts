import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormMp3PageRoutingModule } from './form-mp3-routing.module';

import { FormMp3Page } from './form-mp3.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormMp3PageRoutingModule,
  ],
  declarations: [FormMp3Page]
})
export class FormMp3PageModule {}
