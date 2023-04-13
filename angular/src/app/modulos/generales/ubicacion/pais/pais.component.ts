import { Component, Injector, ViewChild } from '@angular/core';
import { PaisDto, PaisServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearEditarPaisComponent } from './crear-editar-pais/crear-editar-pais.component';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss'],
  providers:[PaisServiceProxy,DialogService]
})

export class PaisComponent extends AppComponentBase  {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    filterText:string = '';
    ref: DynamicDialogRef;

    constructor(public injector: Injector,private _paisService: PaisServiceProxy,public dialogService: DialogService){
        super(injector);
    }

    public getAllRecords(event?: LazyLoadEvent): void {
        this.primengTableHelper.showLoadingIndicator();

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            return;
        }

        this._paisService.getAll(
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

    onClear(event?: LazyLoadEvent){
        this.filterText = '';
        this.getAllRecords(event);
    }

    OnCreatePais(){
        this.ref = this.dialogService.open(CrearEditarPaisComponent, {
            header: 'Editar Pais',
            width: '35%',
            contentStyle: {"max-height": "500px", "overflow": "auto"},
            baseZIndex: 10000
        });

        this.ref.onDestroy.subscribe(
            ()=>{
                this.filterText = '';
                this.getAllRecords();
            }
        );
    }

    OnEditPais(pais:PaisDto){

        this.ref = this.dialogService.open(CrearEditarPaisComponent, {
            header: 'Editar Pais - ' + pais.descripcion,
            width: '35%',
            data:{
                id: pais.id
            },
            contentStyle: {"max-height": "500px", "overflow": "auto"},
            baseZIndex: 10000
        });

        this.ref.onDestroy.subscribe(
            ()=>{
                this.filterText = '';
                this.getAllRecords();
            }
        );
    }
}
