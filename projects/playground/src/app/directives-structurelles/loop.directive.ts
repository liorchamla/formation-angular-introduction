import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[loopOf]',
})
export class LoopDirective {
  @Input('loopOf') arr: any[] = [];
  initialLength = 0;

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {}

  ngDoCheck() {
    if (this.arr.length === this.initialLength) {
      // Le tableau n'a  pas changé, on n'a rien à faire ici
      return;
    }

    // Sinon on réaffiche :
    this.container.clear();

    this.arr.forEach((item, index) => {
      this.container.createEmbeddedView(this.template, {
        $implicit: item,
        index,
      });
    });
  }
}
