import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { PaisComponent } from './pais/pais.component';
import { ProvinciaComponent } from './provincia/provincia.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Ubicacion',
            status: false,
        },
        children: [
            {
                path: 'pais',
                component: PaisComponent,
                data: {
                    title: 'Listado de Paises',
                    canActivate: [AppRouteGuard],
                    permission: 'Aplicacion.Generales.Ubicacion.Pais',
                    status: true,
                },
            },
            {
                path: 'provincia',
                component: ProvinciaComponent,
                data: {
                    title: 'Listado de Provincias',
                    canActivate: [AppRouteGuard],
                    permission: 'Aplicacion.Generales.Ubicacion.Provincia',
                    status: true,
                },
            },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionRoutingModule { }
