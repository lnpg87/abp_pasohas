import { Injector, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent extends AppComponentBase implements OnInit {

    model: any[] = [];

    constructor(injector: Injector,public layoutService: LayoutService) {
        super(injector);
     }
    ngOnInit(): void {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                        permissionName : 'Pages.Roles'
                    }
                ]
            },
            {
                label: 'Generales',
                permissionName : 'Aplicacion.Generales',
                items: [
                    {
                        label: 'Cliente',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/app/generales/cliente'],
                        permissionName : 'Aplicacion.Generales.Cliente'
                    }
                ]
            },
            {
                label: 'Administracion',
                permissionName : 'Aplicacion',
                items:[
                    {
                        label: 'Roles',
                        icon: 'fa-solid fa-tower-control',
                        routerLink: ['/app/roles'],
                        permissionName : 'Pages.Roles'
                    }
                ]

            }
        ]
    }

}
