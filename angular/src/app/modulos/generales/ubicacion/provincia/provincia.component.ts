import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PaisServiceProxy, ProvinciaServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { CrearEditarProvinciaComponent } from './crear-editar-provincia/crear-editar-provincia.component';

@Component({
    selector: 'app-provincia',
    templateUrl: './provincia.component.html',
    styleUrls: ['./provincia.component.scss']
})
export class ProvinciaComponent extends AppComponentBase implements OnInit {
    
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    filterText: string = '';
    ref: DynamicDialogRef;
    statuses: any[];

    constructor(
        public injector: Injector,
        private _provinciaService: ProvinciaServiceProxy,
        private _dialogService: DialogService,
        public _paisService: PaisServiceProxy
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    public getAllRecords(event?: LazyLoadEvent): void {
        this.primengTableHelper.showLoadingIndicator();

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this._provinciaService
            .getAll(
                this.primengTableHelper.getSorting(this.dataTable),
                this.filterText,
                '',
                this.primengTableHelper.getSkipCount(this.paginator, event),
                this.primengTableHelper.getMaxResultCount(this.paginator, event)
            )
            .pipe(
                finalize(() => this.primengTableHelper.hideLoadingIndicator())
            )
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    OnCreateProvincia() {
        this.ref = this._dialogService.open(CrearEditarProvinciaComponent, {
            header: 'Crear Provincia',
            width: '35%',
            contentStyle: { 'max-height': '500px', overflow: 'auto' },
            baseZIndex: 10000,
        });

        this.ref.onDestroy.subscribe(() => {
            this.filterText = '';
            this.getAllRecords();
        });
    }

    onClear(event?: LazyLoadEvent) {
        this.filterText = '';
        this.getAllRecords(event);
    }

    onChangePais(value:string){
        console.log(value);
    }
}
