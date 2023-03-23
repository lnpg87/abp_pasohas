import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { PaisComponent } from './pais/pais.component';
import { SharedModule } from '@shared/shared.module';
import { CrearEditarPaisComponent } from './pais/crear-editar-pais/crear-editar-pais.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaisComponent,
    CrearEditarPaisComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UbicacionRoutingModule
  ]
})
export class UbicacionModule { }
