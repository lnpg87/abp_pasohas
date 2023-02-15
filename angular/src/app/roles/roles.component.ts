import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
    RoleServiceProxy,
    RoleDto,
    RoleDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { CreateRoleDialogComponent } from './create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './edit-role/edit-role-dialog.component';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

class PagedRolesRequestDto extends PagedRequestDto {
    keyword: string;
}

@Component({
    templateUrl: './roles.component.html',
    animations: [appModuleAnimation()],
    providers:[DialogService]
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> {
    roles: RoleDto[] = [];
    selectedRole: RoleDto;
    keyword = '';

    constructor(
        injector: Injector,
        private _rolesService: RoleServiceProxy,
        private _modalService: DialogService,
        private primengConfig: PrimeNGConfig
    ) {
        super(injector);
    }

    list(
        request: PagedRolesRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        request.keyword = this.keyword;

        this._rolesService
            .getAll(request.keyword, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: RoleDtoPagedResultDto) => {
                this.roles = result.items;
                this.showPaging(result, pageNumber);
            });

            this.primengConfig.ripple = true;
    }

    delete(role: RoleDto): void {
        abp.message.confirm(
            this.l('RoleDeleteWarningMessage', role.displayName),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._rolesService
                        .delete(role.id)
                        .pipe(
                            finalize(() => {
                                abp.notify.success(
                                    this.l('SuccessfullyDeleted')
                                );
                                this.refresh();
                            })
                        )
                        .subscribe(() => {});
                }
            }
        );
    }

    createRole(): void {
        this.showCreateOrEditRoleDialog();
    }

    editRole(role: RoleDto): void {
        this.showCreateOrEditRoleDialog(role.id);
    }

    showCreateOrEditRoleDialog(id?: number): void {
        let createOrEditRoleDialog: DynamicDialogRef;

        if (!id) {
            createOrEditRoleDialog = this._modalService.open(
                CreateRoleDialogComponent,{
                    header: 'Crear Rol',
                    width: '70%',
                    contentStyle: {"overflow": "auto"},
                    baseZIndex: 10000,
                    maximizable: true
                });
        } else {
            createOrEditRoleDialog = this._modalService.open(
                EditRoleDialogComponent,{
                    header: 'Editar Rol',
                    width: '70%',
                    contentStyle: {"overflow": "auto"},
                    baseZIndex: 10000,
                    maximizable: true,
                    data: {
                        id
                    }
                }
            );
        }

        let dialogRef = this._modalService.dialogComponentRefMap.get(createOrEditRoleDialog);

        dialogRef.changeDetectorRef.detectChanges();

        const instanceDialog = dialogRef.instance.componentRef.instance as CreateRoleDialogComponent;

        instanceDialog.Save.subscribe(() => {
            this.refresh();
        });
    }
}
