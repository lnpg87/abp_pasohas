import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { PaisComponent } from './pais/pais.component';
import { SharedModule } from '@shared/shared.module';
import { CrearEditarPaisComponent } from './pais/crear-editar-pais/crear-editar-pais.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { CrearEditarProvinciaComponent } from './provincia/crear-editar-provincia/crear-editar-provincia.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    PaisComponent,
    CrearEditarPaisComponent,
    ProvinciaComponent,
    CrearEditarProvinciaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UbicacionRoutingModule
  ]
})
export class UbicacionModule { }
