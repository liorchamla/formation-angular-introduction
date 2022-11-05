import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[repeat]',
})
export class RepeatDirective {
  @Input('repeat') times = 0;

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    this.container.clear();

    for (let i = 0; i < this.times; i++) {
      this.container.createEmbeddedView(this.template, {
        $implicit: i,
      });
    }
  }
}
