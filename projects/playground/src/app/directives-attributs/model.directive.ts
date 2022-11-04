import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[model]',
})
export class ModelDirective {
  @Output('modelChange')
  onValueChangeEvent = new EventEmitter();

  @Input('model')
  @HostBinding('value')
  value: any;

  @HostListener('input', ['$event.target'])
  onInput(element: HTMLInputElement) {
    if (element.type === 'number') {
      this.onValueChangeEvent.emit(element.valueAsNumber);
      return;
    }

    this.onValueChangeEvent.emit(element.value);
  }
}
