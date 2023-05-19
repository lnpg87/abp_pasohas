import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-validation-errors',
    templateUrl: './validation-errors.component.html',
    styleUrls: ['./validation-errors.component.scss'],
})
export class ValidationErrorsComponent implements OnChanges {
    @Input() errors: Record<string, ValidationErrors> | null = {};
    @Input() customErrorMessages: Record<string, string> = {};

    errorMessages: Record<string, string> = {
        required: 'Este campo es obligatorio' ,
        minlength: 'El campo tiene más caracteres de lo permitido',
        maxlength: 'El campo tiene menos caracteres de lo permitido',
        pattern: 'El campo posee caracteres no valido'
    };

    ngOnChanges(changes: SimpleChanges): void {
        const { customErrorMessages } = changes;
        if (customErrorMessages) {
            this.errorMessages = {
                ...this.errorMessages,
                ...customErrorMessages.currentValue,
            };
        }
    }
}
