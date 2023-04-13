import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { PaisDto, PaisServiceProxy, ProvinciaDto, ProvinciaServiceProxy } from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-crear-editar-provincia',
  templateUrl: './crear-editar-provincia.component.html',
  styleUrls: ['./crear-editar-provincia.component.scss'],
  providers:[MessageService,ProvinciaServiceProxy,PaisServiceProxy]
})
export class CrearEditarProvinciaComponent extends AppComponentBase implements OnInit  {

    formProvincia: FormGroup;
    provinciaDto: ProvinciaDto;
    paisDto:PaisDto[];
    selectedCountry: string;


    constructor(
        public injector: Injector,
        private _provinciaService: ProvinciaServiceProxy,
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _provinciaDialogRef: DynamicDialogRef,
        private _paisService: PaisServiceProxy,
        private messageService: MessageService
    ) {
        super(injector);

        this.initialize();
    }

    ngOnInit(): void {
        this.initialize();

        this.loadListPais();

        if (this.config.data?.id) {

        }


    }

    initialize(): void {
        this.formProvincia = this.fb.group(
            {
                descripcion: ['',
                    {
                        validators: [
                            Validators.required,
                            Validators.minLength(2),
                            Validators.maxLength(100),
                            Validators.pattern('[-_a-zA-Z0-9]*'),
                        ],
                    },
                ],
                paisId: ['',
                    {
                        validators: [Validators.required],
                    },
                ],
            },
            {
                updateOn: 'blur',
            }
        );
    }

    loadListPais(){
        this._paisService.getAll('','','',0,10000).subscribe({
            next: data =>{
                this.paisDto = data.items;
                console.log(data.items);
            },
        });
    }

    onSubmit(){

    }
}
