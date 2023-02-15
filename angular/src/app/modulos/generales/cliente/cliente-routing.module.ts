import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '../../../../shared/auth/auth-route-guard';
import { ClienteComponent } from './cliente.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';

const routes: Routes = [
    {
        path: '',
        component: ClienteComponent,
        canActivate: [AppRouteGuard],
        data: {
            title: 'Cliente',
            status: true,
        },
        children: [{
            path: '',
            component: CrearClienteComponent,
            data: {
              title: 'Listado de clientes',
              canActivate: [AppRouteGuard],
              permission: 'Aplicacion.Generales.Cliente',
              status: true
            }
          }]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClienteRoutingModule {}
