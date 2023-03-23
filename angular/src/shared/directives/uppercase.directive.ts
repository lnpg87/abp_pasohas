import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

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

    constructor(public ref: ElementRef) {}

    @HostListener('input', ['$event']) onInput($event) {
        var start = $event.target.selectionStart;
        var end = $event.target.selectionEnd;
        $event.target.value = $event.target.value.toUpperCase();
        $event.target.setSelectionRange(start, end);
        $event.preventDefault();

        if (!this.lastValue ||(this.lastValue && $event.target.value.length > 0 &&this.lastValue !== $event.target.value)) {
            this.lastValue = this.ref.nativeElement.value = $event.target.value;
            // Propagation
            const evt = document.createEvent('HTMLEvents');
            evt.target.dispatchEvent(evt);
        }
    }
}
