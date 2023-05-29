import {
    Component,
    Injector,
    OnInit,
    SkipSelf,
    ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
    PaisDto,
    PaisServiceProxy,
    ProvinciaDto,
    ProvinciaServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-crear-editar-provincia',
    templateUrl: './crear-editar-provincia.component.html',
    styleUrls: ['./crear-editar-provincia.component.scss'],
})
export class CrearEditarProvinciaComponent extends AppComponentBase implements OnInit{
    formProvincia: FormGroup;

    provinciaDto: ProvinciaDto;
    paisDto: PaisDto[];

    constructor(
        public injector: Injector,
        private _provinciaService: ProvinciaServiceProxy,
        private config: DynamicDialogConfig,
        public fb: FormBuilder,
        private _provinciaDialogRef: DynamicDialogRef,
        public _paisService: PaisServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.initialize();

        this.loadListPais();

        if (this.config.data?.id) {
            this._provinciaService
                .get(this.config.data.id)
                .pipe(finalize(() => {}))
                .subscribe((result) => {
                    console.log(result);
                    this.formProvincia.patchValue(result);
                });
        }
    }

    initialize(): void {
        this.formProvincia = this.fb.group(
            {
                descripcion: [
                    '',
                    {
                        validators: [
                            Validators.required,
                            Validators.minLength(2),
                            Validators.maxLength(100),
                            Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)*$'),
                        ],
                    },
                ],
                paisId: [
                    '',
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

    loadListPais() {}

    onSubmit() {
        if (this.formProvincia.valid) {
            if (!this.config.data?.id) {
                this._provinciaService
                    .create(this.formProvincia.value)
                    .subscribe({
                        next: () => {
                            this._provinciaDialogRef.close();
                        },
                        error: (err) => {
                            this._provinciaDialogRef.close();
                        },
                    });
            }
        }
    }
}
