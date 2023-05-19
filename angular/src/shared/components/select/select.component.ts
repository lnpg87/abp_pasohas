import { ChangeDetectorRef, Component, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true,
      },
    ],
  })
  export class SelectComponent<T> extends ControlValueAccessorDirective<T> implements OnInit{
    @Input() options: T[] = [];
    @Input() selectId = '';
    @Input() label = '';
    @Input() customErrorMessages: Record<string, string> = {};

    constructor(injector: Injector){
        super(injector);
    }

    ngOnInit(): void {
       super.ngOnInit();
    }
  }
