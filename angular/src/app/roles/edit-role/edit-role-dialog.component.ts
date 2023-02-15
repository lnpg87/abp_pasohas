import { Component, Injector, OnInit, EventEmitter, Output, ViewChild, } from '@angular/core';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
    RoleServiceProxy,
    GetRoleForEditOutput,
    RoleDto,
    PermissionDto,
    RoleEditDto,
    FlatPermissionDto
} from '@shared/service-proxies/service-proxies';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { PermissionTreeComponent } from '@shared/components/permisos/permission-tree.component';

@Component({
    templateUrl: 'edit-role-dialog.component.html',
    styleUrls: ['edit-role-dialog.component.scss']
})
export class EditRoleDialogComponent extends AppComponentBase implements OnInit {
    @ViewChild('permissionTree', {static: false}) permissionTree: PermissionTreeComponent;

    saving = false;
    id: number;
    role = new RoleEditDto();
    permissions: FlatPermissionDto[];
    grantedPermissionNames: string[];
    checkedPermissionsMap: { [key: string]: boolean } = {};

    @Output() Save = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _roleService: RoleServiceProxy,
        public bsModalRef: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        super(injector);
    }

    ngOnInit(): void {

        this.id = this.config.data.id;

        this._roleService
            .getRoleForEdit(this.id)
            .subscribe((result: GetRoleForEditOutput) => {
                this.role = result.role;
                this.permissions = result.permissions;
                this.grantedPermissionNames = result.grantedPermissionNames;
                this.permissionTree.editData = result;
                this.setInitialPermissionsStatus();
            });
    }

    setInitialPermissionsStatus(): void {
        _map(this.permissions, (item) => {
            this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
                item.name
            );
        });
    }

    isPermissionChecked(permissionName: string): boolean {
        return _includes(this.grantedPermissionNames, permissionName);
    }

    onPermissionChange(permission: PermissionDto, $event) {
        this.checkedPermissionsMap[permission.name] = $event.target.checked;
    }

    getCheckedPermissions(): string[] {
        const permissions: string[] = [];
        _forEach(this.checkedPermissionsMap, function (value, key) {
            if (value) {
                permissions.push(key);
            }
        });
        return permissions;
    }

    save(): void {
        this.saving = true;

        const role = new RoleDto();
        role.init(this.role);
     //   role.grantedPermissions = this.getCheckedPermissions();
        role.grantedPermissions = this.permissionTree.getGrantedPermissionNames();

        this._roleService.update(role).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.close();
                this.Save.emit();
            },
            () => {
                this.saving = false;
            }
        );
    }
}
