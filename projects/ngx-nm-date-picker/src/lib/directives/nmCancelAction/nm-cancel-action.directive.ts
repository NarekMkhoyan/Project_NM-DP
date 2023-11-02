import { Directive, ElementRef, Input } from "@angular/core";
import { removeParentNodeListener } from "../../utils/checkParentNode";

@Directive({
  selector: "[nmCancelAction]",
})
export class NmCancelActionDirective {
  @Input("nmCancelAction") set cancelAction(cancel: boolean) {
    if (!cancel) {
      return;
    }
    removeParentNodeListener(this.el.nativeElement, 'nmValueSetter')
  }

  constructor(private readonly el: ElementRef) {}
}
