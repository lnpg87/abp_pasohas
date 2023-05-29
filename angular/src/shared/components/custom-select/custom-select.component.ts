import { ChangeDetectorRef, Component, Inject, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';
import { PaisDto } from '@shared/service-proxies/service-proxies';
import {
    Subject,
    debounceTime,
    distinctUntilChanged,
    finalize,
    switchMap,
    tap,
} from 'rxjs';

@Component({
    selector: 'app-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomSelectComponent),
            multi: true,
        },
    ],
})
export class CustomSelectComponent<T>
    extends ControlValueAccessorDirective<T>
    implements OnInit
{
    //Output Properties
    @Output() valuedChanged = new EventEmitter();

    //Input Properties
    @Input() bindId: string | number = 'id';
    @Input() bindLabel: string | number = 'descripcion';
    @Input() options: T[] = [];
    @Input() label = '';
    @Input() showLabel = true;
    @Input() customErrorMessages: Record<string, string> = {};
    @Input() clearable = true;
    @Input() service: any = null;
    @Input() debounceTime = 500;
    @Input() itemsPerPage = 10;
    @Input() appendTo = 'body';
    @Input() placeholder: string;
    @Input() showValue = true;
    @Input() selectId = '';
    @Input() multiSelect = false;

    //Public Properties
    public items: any[] = [];
    public typeAhead = new Subject<string>();
    public selectedFilter = '';
    public loading = false;

    //Private Properties
    private currentPage = 1;
    private selectedValue: number | string;

    //Custom Functions
    @Input()
    get filtrer(): string {
        return this.selectedFilter;
    }
    set filtrer(valor: string) {
        this.selectedFilter = valor;
    }

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (this.appendTo === 'modal') {
            this.appendTo = undefined;
        }

        if (this.placeholder === undefined || this.placeholder === '') {
            this.placeholder = 'Seleccione uno...';
        }

        if (this.options.length === 0 && this.service) {
            this.loadOptions();
        }
            this.control.valueChanges.subscribe((newValue) => {
                if(!this.selectedValue){
                console.log(newValue,this.selectedValue);
                this.selectedValue = newValue;
                this.loadMore();
                }
            });
        
    }

    public loadOptions(): void {
        this.items.length = 0;
        if (this.options.length == 0) {
            this.service
                .getAll('', '', this.selectedFilter, 0, this.itemsPerPage)
                .pipe(finalize(() => {}))
                .subscribe((resultado: { items: any }) => {
                    this.items = [...resultado.items];
                    this.currentPage = 1;
                });
        }

        this.typeAhead
            .pipe(
                debounceTime(this.debounceTime),
                distinctUntilChanged(),
                tap(() => (this.loading = true)),
                switchMap((term) =>
                    this.service
                        .getAll(
                            '',
                            term == null || term == undefined ? '' : term,
                            this.selectedFilter,
                            0,
                            this.itemsPerPage
                        )
                        .pipe(
                            finalize(() => {
                                this.loading = false;
                            })
                        )
                )
            )
            .subscribe((resultado: any) => {
                this.items = [...resultado.items];
                this.currentPage = 1;
            });

        this.loading = false;
    }

    public loadMore(): void {
        if (this.selectedValue) {
            this.loading = true;
            console.log(this.items);
            if (!this.items.some((x) => x.id === this.selectedValue) && this.items.length > 0) {
                this.service
                    .get(this.selectedValue)
                    .pipe(finalize(() => {}))
                    .subscribe((resultado: any) => {
                        if (resultado) {
                            this.items.push(resultado);
                            this.items = [...this.items];
                            this.currentPage = 1;
                        }
                    });
            }

            this.control.setValue(this.selectedValue);

        } else {
            this.service
                .getAll(
                    '',
                    '',
                    this.selectedFilter,
                    this.currentPage * this.itemsPerPage,
                    this.itemsPerPage
                )
                .pipe(finalize(() => {}))
                .subscribe((resultado: any) => {
                    if (resultado.items.length > 0) {
                        this.items = [
                            ...this.items,
                            ...resultado.items.filter(
                                (u: any) => !this.items.includes(u)
                            ),
                        ];
                        this.currentPage += 1;
                    }
                });
        }
        this.loading = false;
    }

    public openSelect(): void {
        if (this.options.length === 0) {
            if (this.items.length <= 0) {
                this.currentPage = 1;
                this.loadOptions;
            }
        }
    }

    public onScrollToEnd(): void {
        if (this.options.length === 0) {
            this.loadMore();
        }
    }

    public onFocus() {
        if (this.selectedValue !== '') {
            this.items.length = 0;
        }
    }

    public onChange(event: any) {
        this.valuedChanged.emit({ id: event?.id, event: event });
    }
}
