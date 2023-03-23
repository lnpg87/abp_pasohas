import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '../../../shared/auth/auth-route-guard';

const routes: Routes = [
    {
        path: '',
        data: {
          title: 'Generales',
          status: false
        },
        children: [
            {
              path: 'cliente',
              data: { permission: 'Aplicacion.Generales.Cliente' },
              canActivate: [AppRouteGuard],
              loadChildren: () => import('./cliente/cliente.module').then(module => module.ClienteModule)
            },
            {
                path: 'ubicacion',
                data: { permission: 'Aplicacion.Generales.Ubicacion' },
                canActivate: [AppRouteGuard],
                loadChildren: () => import('./ubicacion/ubicacion.module').then(module => module.UbicacionModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralesRoutingModule { }
