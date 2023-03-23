import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from '@shared/app-component-base';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { EditRoleDialogComponent } from './edit-role/edit-role-dialog.component';

@Component({
    templateUrl: './roles.component.html',
    animations: [appModuleAnimation()],
    providers:[DialogService]
})
export class RolesComponent extends AppComponentBase {
    constructor(injector: Injector,
                private _rolService: RoleServiceProxy,
                private dialogService: DialogService){
        super(injector);
    }

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    filterText:string = '';

    ref: DynamicDialogRef;

    public getAllRecords(event?: LazyLoadEvent): void {
        this.primengTableHelper.showLoadingIndicator();

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this._rolService.getAll(
            this.primengTableHelper.getSorting(this.dataTable),
            this.filterText,
            '',
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event))

            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe(result => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            }
        );
    }

    editRol(id:number){
        this.ref = this.dialogService.open(EditRoleDialogComponent, {
            header: 'Editar Rol',
            width: '70%',
            contentStyle: {"overflow": "auto"},
            baseZIndex: 10000,
            maximizable: true,
            data: {
                id
            }
        });
    }
}
