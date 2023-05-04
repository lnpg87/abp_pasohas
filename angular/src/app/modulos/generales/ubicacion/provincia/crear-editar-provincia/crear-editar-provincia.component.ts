import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomSelectComponent } from '@shared/components/custom-select/custom-select.component';
import { PaisDto, PaisServiceProxy, ProvinciaDto, ProvinciaServiceProxy } from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

interface City {
    name: string;
    code: string;
}

@Component({
  selector: 'app-crear-editar-provincia',
  templateUrl: './crear-editar-provincia.component.html',
  styleUrls: ['./crear-editar-provincia.component.scss'],
  providers:[MessageService,ProvinciaServiceProxy,PaisServiceProxy]
})
export class CrearEditarProvinciaComponent extends AppComponentBase implements OnInit  {

    @ViewChild('paisSelect', {static: false}) paisSelect : CustomSelectComponent;

    formProvincia: FormGroup;
    provinciaDto: ProvinciaDto;
    paisDto:PaisDto[];
    selectedCountry: string;


    cities: City[];

    selectedCity: City;

    constructor(
        public injector: Injector,
        private _provinciaService: ProvinciaServiceProxy,
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _provinciaDialogRef: DynamicDialogRef,
        public _paisService: PaisServiceProxy,
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
        
    }

    onSubmit(){

    }

    onScroll(event){
      console.log(event);
    }
}
