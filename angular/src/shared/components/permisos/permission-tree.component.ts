import { Component, Injector, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import * as _ from 'lodash';
import { PermissionTreeEditModel } from './permission-tree-edit.model';
import { AppComponentBase } from './../../app-component-base';
import { ArrayToTreeConverterService } from './../../helpers/array-to-tree-converter.service';
import { TreeDataHelperService } from './../../helpers/tree-data-helper.service';
import { FlatPermissionDto } from './../../service-proxies/service-proxies';

@Component({
    selector: 'app-permission-tree',
    template:
    `<p-tree *ngIf="!roleStatic" [value]="treeData" [(selection)]="selectedPermissions" selectionMode="checkbox"
    (onNodeSelect)="nodeSelect($event)" [propagateSelectionUp]="false"></p-tree>

    <p-tree *ngIf="roleStatic" [value]="treeData" [(selection)]="selectedPermissions" selectionMode="single"
    (onNodeSelect)="nodeSelect($event)" [propagateSelectionUp]="false" [filter]="true"></p-tree>`

})

export class PermissionTreeComponent extends AppComponentBase {
    @Input() roleStatic;

    set editData(val: PermissionTreeEditModel) {
        this.setTreeData(val.permissions);
    }

    treeData: any;
    selectedPermissions: TreeNode[] = [];

    constructor(
        private _arrayToTreeConverterService: ArrayToTreeConverterService,
        private _treeDataHelperService: TreeDataHelperService,
        injector: Injector
    ) {
        super(injector);
    }

    setTreeData(permissions: FlatPermissionDto[]) {
        this.treeData = this._arrayToTreeConverterService.createTree(permissions, 'parentName', 'name', null, 'children',
            [{
                target: 'label',
                source: 'name'
            }, {
                target: 'expandedIcon',
                value: 'fa fa-folder-open m--font-warning'
            },
            {
                target: 'collapsedIcon',
                value: 'fa fa-folder m--font-warning'
            },
            {
                target: 'collapsed',
                value: true
            }]);
    }

    setSelectedNodes(grantedPermissionNames: string[]) {
        _.forEach(grantedPermissionNames, permission => {
            const item = this._treeDataHelperService.findNode(this.treeData, { data: { name: permission } });
            if (item) {
                this.selectedPermissions.push(item);
            }
        });
    }

    getGrantedPermissionNames(): string[] {
        if (!this.selectedPermissions || !this.selectedPermissions.length) {
            return [];
        }

        const permissionNames = [];

        for (let i = 0; i < this.selectedPermissions.length; i++) {
            permissionNames.push(this.selectedPermissions[i].data.name);
        }

        return permissionNames;
    }

    nodeSelect(event) {
        let parentNode = this._treeDataHelperService.findParent(this.treeData,
                        {
                            data: {
                                name: event.node.name
                            }
                        });

        while (parentNode != null) {
            this.selectedPermissions.push(parentNode);
            parentNode = this._treeDataHelperService.findParent(this.treeData, { data: { name: parentNode.name } });
        }
    }
}
