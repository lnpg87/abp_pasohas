import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor {

    @Input() title = '';
    @Input() type = 'text';
    @Input() class:string;
    @Input() placeholder: string;

    constructor(@Self() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
      }

    writeValue(obj: any): void {

    }
    registerOnChange(fn: any): void {

    }
    registerOnTouched(fn: any): void {

    }
    setDisabledState?(isDisabled: boolean): void {

    }

}
