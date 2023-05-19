import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
    PaisDto,
    PaisServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-crear-editar-pais',
    templateUrl: './crear-editar-pais.component.html',
    styleUrls: ['./crear-editar-pais.component.scss']
})
export class CrearEditarPaisComponent extends AppComponentBase implements OnInit {
    formPais: FormGroup;
    paisDto: PaisDto;

    constructor(
        public injector: Injector,
        private _paisService: PaisServiceProxy,
        private fb: FormBuilder,
        public config: DynamicDialogConfig,
        private _paisDialogRef: DynamicDialogRef,
        private messageService: MessageService
    ) {
        super(injector);
    }

    ngOnInit(): void {

        this.initialize();

        if (this.config.data?.id) {
            this._paisService
                .get(this.config.data.id)
                .pipe(finalize(() => {}))
                .subscribe((result) => {
                    this.formPais.patchValue(result)
                });
        }
    }

    initialize(): void {
        this.formPais = this.fb.group(
            {
                codigoIso: ['',
                    {
                        validators: [
                            Validators.required,
                            Validators.minLength(2),
                            Validators.maxLength(2),
                            Validators.pattern('^[a-zA-Z]+$'),
                        ],
                    },
                ],
                descripcion: ['',
                    {
                        validators: [
                            Validators.required,
                            Validators.maxLength(150),
                            Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)?$')
                        ],
                    },
                ],
            },
            {
                updateOn: 'blur',
            }
        );

    }

    onSubmit() {
        if (this.formPais.valid) {
            if (this.config.data?.id) {
                this.paisDto = this.formPais.value;
                this.paisDto.id = this.config.data.id;

                this._paisService.update(this.paisDto).subscribe({
                    next: ()=>{
                        this._paisDialogRef.close();
                    },
                    error: err => {
                        this._paisDialogRef.close();
                    },
                });
            }else{
                console.log(this.formPais.valid);
                if(this.formPais.valid){
                    this._paisService.create(this.formPais.value).subscribe({
                        next: ()=>{
                            this._paisDialogRef.close();
                        },
                        error: err=>{
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Service Message',
                                detail: err,
                            });
                        }
                    });
                }
            }
        }
    }
}
