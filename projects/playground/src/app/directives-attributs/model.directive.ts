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

  /**
   * La méthode onInput() sera appelée à chaque fois qu'un événément input se produit sur
   * l'élément HTML sur lequel la directive est greffée.
   *
   * Cette notation est l'équivalent de :
   *
   * input.addEventListener('input', ($event) => {
   *    this.onInput($event.target);
   * });
   */
  @HostListener('input', ['$event.target'])
  onInput(element: HTMLInputElement) {
    if (element.type === 'number') {
      this.onValueChangeEvent.emit(element.valueAsNumber);
      return;
    }

    this.onValueChangeEvent.emit(element.value);
  }
}
