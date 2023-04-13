import {
    Directive,
    EventEmitter,
    HostListener,
    Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[uppercase]',
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '(input)': '$event',
    },
})
export class UppercaseDirective {
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    lastValue: string;

    constructor(private readonly control: NgControl) {}

    @HostListener('input', ['$event.target'])
    public onInput(input: HTMLInputElement): void {
        const caretPos = input.selectionStart;
        this.control.control.setValue(input.value.toUpperCase());
        input.setSelectionRange(caretPos, caretPos);
    }
}
