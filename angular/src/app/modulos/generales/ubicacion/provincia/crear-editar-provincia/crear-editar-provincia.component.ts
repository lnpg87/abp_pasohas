import { Component, Injector, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { PaisDto, PaisServiceProxy, ProvinciaDto, ProvinciaServiceProxy } from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-crear-editar-provincia',
  templateUrl: './crear-editar-provincia.component.html',
  styleUrls: ['./crear-editar-provincia.component.scss']
})
export class CrearEditarProvinciaComponent extends AppComponentBase implements OnInit  {
    errorMessages = { required: 'The name field is required' };
    testControl = new FormControl('MyDefaultValue', Validators.required);

    isCitiesControlVisible = true;
    cities: any[] = [
        { id: 1, name: 'Vilnius' },
        { id: 2, name: 'Kaunas' },
        { id: 3, name: 'Pavilnys (Disabled)', disabled: true },
        { id: 4, name: 'Pabradė' },
    ];

    formProvincia : FormGroup;

    provinciaDto: ProvinciaDto;
    paisDto:PaisDto[];

    constructor(
        public injector: Injector,
        private _provinciaService: ProvinciaServiceProxy,
        private config: DynamicDialogConfig,
        public fb: FormBuilder,
        private _provinciaDialogRef: DynamicDialogRef,
        public _paisService: PaisServiceProxy,
        private messageService: MessageService
    ) {
        super(injector);

        this.initialize();
    }

    ngOnInit(): void {
       // this.initialize();

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
                            Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'),
                        ],
                    },
                ],
                paisId: ['',
                    {
                        validators: [Validators.required],
                    }
                ]
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
}
