import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
import {PaginatorModule} from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { UppercaseDirective } from './directives/uppercase.directive';
import { MessagesModule } from 'primeng/messages';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ControlValueAccessorDirective } from './directives/control-value-accessor.directive';
import { ValidationErrorsComponent  } from './components/validation-errors/validation-errors.component';
import { SelectComponent } from './components/select/select.component';
import { AppRoutingModule } from '@app/app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TableModule,
        TreeModule,
        InputTextModule,
        PaginatorModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        MessagesModule,
        NgSelectModule
    ],
    declarations: [
        AbpValidationSummaryComponent,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        PermissionTreeComponent,
        CustomSelectComponent,
        LocalizePipe,
        BusyDirective,
        EqualValidator,
        TextInputComponent,
        UppercaseDirective,
        ControlValueAccessorDirective,
        ValidationErrorsComponent,
        SelectComponent,
    ],
    exports: [
        AbpValidationSummaryComponent,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        PermissionTreeComponent,
        TextInputComponent,
        CustomSelectComponent,
        SelectComponent,
        LocalizePipe,
        BusyDirective,
        UppercaseDirective,
        ControlValueAccessorDirective,
        EqualValidator,
        TableModule,
        InputTextModule,
        ButtonModule,
        TabViewModule,
        InputTextareaModule,
        CardModule,
        ToolbarModule,
        TreeModule,
        PaginatorModule,
        SidebarModule,
        DropdownModule,
      //  NgSelectModule,
        ReactiveFormsModule,
        MessagesModule,
        ValidationErrorsComponent
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
