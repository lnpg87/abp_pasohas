import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { PaisDto, PaisServiceProxy } from '@shared/service-proxies/service-proxies';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-crear-editar-pais',
  templateUrl: './crear-editar-pais.component.html',
  styleUrls: ['./crear-editar-pais.component.scss']
})
export class CrearEditarPaisComponent extends AppComponentBase implements OnInit {

    formPais: FormGroup;
    paisDto: PaisDto;

    constructor(public injector: Injector,
        private _paisService: PaisServiceProxy,
        private fb: FormBuilder,
        public config: DynamicDialogConfig){
        super(injector);

        this.initialize();
    }

    ngOnInit(): void {

        if(this.config.data?.id){

             this._paisService.get(this.config.data.id)
                 .pipe(finalize(()=>{}))
                 .subscribe(result=>{

                     this.paisDto = result;

                     this.formPais.patchValue(result);
                 });
        }
    }

    initialize(): void{
        this.formPais = this.fb.group({
            codigoIso:[null,{
                validators:[
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(2)
                ]
            }],
            descripcion: ['',{
                validators:[
                    Validators.required
                ]
            }]
        },
        {
            updateOn: 'change'
        }
        );
    }

    onSubmit() {
        throw new Error('Method not implemented.');
    }
}
