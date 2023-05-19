import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener,
    Inject,
    Injector,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    Validators,
    NgControl,
    FormControlName,
    FormGroupDirective,
    FormControlDirective,
} from '@angular/forms';
import {
    Subject,
    takeUntil,
    startWith,
    distinctUntilChanged,
    tap,
    map,
} from 'rxjs';

@Directive({
    selector: '[appControlValueAccessor]',
})
export class ControlValueAccessorDirective<T>
    implements ControlValueAccessor, OnInit
{
    control: FormControl | undefined;
    isRequired = false;
    isUpperCase = true;

    private _isDisabled = false;
    private _destroy$ = new Subject<void>();
    private _onTouched!: () => T;
    private initialized = false;

    constructor(@Inject(Injector) private injector: Injector) {
        //this.initialized = true;
    }

    ngOnInit(): void {
        this.setFormControl();
        this.isRequired =
            this.control?.hasValidator(Validators.required) ?? false;
    }

    setFormControl() {
        try {
            const formControl = this.injector.get(NgControl);

            switch (formControl.constructor) {
                case FormControlName:
                    this.control = this.injector
                        .get(FormGroupDirective)
                        .getControl(formControl as FormControlName);
                    break;
                default:
                    this.control = (formControl as FormControlDirective)
                        .form as FormControl;
                    break;
            }
        } catch (err) {
            this.control = new FormControl();
        }
    }

    writeValue(value: T): void {
        if (!this.control) {
            this.control = new FormControl(value);
        } else {
            if (this.control.value !== value) {
                this.control.setValue(value);
            }
        }
    }

    registerOnChange(fn: (val: T | null | unknown) => T): void {
        this.control?.valueChanges
            .pipe(
                takeUntil(this._destroy$),
                startWith(this.control.value),
                distinctUntilChanged(),
                tap((val) => fn(val))
            )
            .subscribe(() => this.control?.markAsUntouched());
    }

    registerOnTouched(fn: () => T): void {
        this._onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._isDisabled = isDisabled;
    }

    @HostListener('input', ['$event.target'])
    public onInput(input: HTMLInputElement): void {
        if (this.isUpperCase) {
            const caretPos = input.selectionStart;
            this.control.setValue(input.value.toUpperCase());
            input.setSelectionRange(caretPos, caretPos);
        }
    }
}
