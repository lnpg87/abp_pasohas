import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ProductService } from './demo/service/product.service';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppSidebarComponent } from './layout/app.sidebar.component';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { GeneralesModule } from './modulos/generales/generales.module';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
import { RolesComponent } from './roles/roles.component';
import { AppFooterComponent } from './layout/app.footer.component';
import { AppMenuComponent } from './layout/app.menu.component';
import { AppConfigModule } from './layout/config/config.module';
import { AppMenuitemComponent } from './layout/app.menuitem.component';

@NgModule({
    declarations: [
        AppComponent,
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        AppLayoutComponent,
        AppTopBarComponent,
        AppSidebarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppMenuitemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        GeneralesModule,
        SharedModule,
        DynamicDialogModule,
        AppConfigModule
    ],
    exports: [
        SharedModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService
    ],
    entryComponents: [
        // roles
        CreateRoleDialogComponent,
        EditRoleDialogComponent
      ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
