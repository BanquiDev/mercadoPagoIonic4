import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCuotasComponent } from '../data-cuotas/data-cuotas.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    DataCuotasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DataCuotasComponent
  ]
})
export class ComponentsModuleModule { }
