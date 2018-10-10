import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[apDraggableHelper]'
})
export class DraggableHelperDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
