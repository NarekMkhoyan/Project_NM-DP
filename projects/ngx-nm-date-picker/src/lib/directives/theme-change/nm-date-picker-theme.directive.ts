import { Directive, ElementRef, HostBinding, Input } from "@angular/core";

@Directive({
  selector: "[nmTheme]",
})
export class NmDatePickerThemeDirective {
  @HostBinding("attr.nm-theme") theme!: string;

  @Input("nmTheme") set pickerTheme(value: "light" | "dark") {
    this.theme = value;
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.el.nativeElement.setAttribute("nm-theme", "light");
  }
}
