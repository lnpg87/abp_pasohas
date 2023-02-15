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
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralesRoutingModule { }
