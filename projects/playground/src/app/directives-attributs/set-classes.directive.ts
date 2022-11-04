import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[set-classes]',
})
export class SetClassesDirective {
  @Input('set-classes')
  cssClasses: { [key: string]: boolean } = {};

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['cssClasses']) {
      return;
    }

    Object.keys(this.cssClasses).forEach((className) => {
      if (this.cssClasses[className]) {
        this.elementRef.nativeElement.classList.add(className);
        return;
      }

      this.elementRef.nativeElement.classList.remove(className);
    });
  }
}
