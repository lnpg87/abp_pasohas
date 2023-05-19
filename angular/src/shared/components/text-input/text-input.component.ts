import { Component, HostListener, Input, QueryList, ViewChildren, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent<T> extends ControlValueAccessorDirective<T> {
    @Input() inputId = '';
    @Input() label = '';
    @Input() type: InputType = 'text';
    @Input() customErrorMessages: Record<string, string> = {};
    @Input() placeholder: string;
    @Input() isUpperCase = true;
}
