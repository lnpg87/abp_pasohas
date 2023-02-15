import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import { RolesComponent } from 'app/roles/roles.component';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>import('app/demo/components/dashboard/dashboard.module').then((m) => m.DashboardModule),
                data: { permission: 'Pages.Roles' },
                canActivate: [AppRouteGuard],
            },
            {
                path: 'generales',
                loadChildren: () =>import('./modulos/generales/generales.module').then((module) => module.GeneralesModule),
                data: { permission: 'Aplicacion.Generales' },
                canActivate: [AppRouteGuard]
            },
            {
                path: 'roles',
                component: RolesComponent,
          //      data: { permission: 'Pages.Roles' },
        //        canActivate: [AppRouteGuard]
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
