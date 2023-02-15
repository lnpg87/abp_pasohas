import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

import { AbpPaginationControlsComponent } from './components/pagination/abp-pagination-controls.component';
import { AbpValidationSummaryComponent } from './components/validation/abp-validation.summary.component';
import { AbpModalHeaderComponent } from './components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from './components/modal/abp-modal-footer.component';
import { LayoutStoreService } from './layout/layout-store.service';

import { BusyDirective } from './directives/busy.directive';
import { EqualValidator } from './directives/equal-validator.directive';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { ArrayToTreeConverterService } from './helpers/array-to-tree-converter.service';
import { TreeDataHelperService } from './helpers/tree-data-helper.service';
import { PermissionTreeComponent } from './components/permisos/permission-tree.component';
import { FormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule,
        TreeModule,
        InputTextModule,
        FormsModule
    ],
    declarations: [
        AbpPaginationControlsComponent,
        AbpValidationSummaryComponent,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        PermissionTreeComponent,
        LocalizePipe,
        BusyDirective,
        EqualValidator
    ],
    exports: [
        AbpPaginationControlsComponent,
        AbpValidationSummaryComponent,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        PermissionTreeComponent,
        LocalizePipe,
        BusyDirective,
        EqualValidator,
        TableModule,
        InputTextModule,
        ButtonModule,
        TabViewModule,
        InputTextareaModule,
        CardModule,
        ToolbarModule,
        TreeModule,
        SidebarModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard,
                LayoutStoreService,
                ArrayToTreeConverterService,
                TreeDataHelperService
            ]
        };
    }
}
