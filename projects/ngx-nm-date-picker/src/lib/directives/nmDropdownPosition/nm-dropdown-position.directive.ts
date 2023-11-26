import { isPlatformServer } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, Inject, NgZone, PLATFORM_ID, Renderer2, Input } from "@angular/core";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";

@Directive({
  selector: "[nmDropdownPosition]",
})
export class NmDropdownPositionDirective implements AfterViewInit {
  @Input() dropdown!: HTMLDivElement;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly stateService: NmDatePickerStateService,
    private readonly el: ElementRef<HTMLDivElement>,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformServer(this.platformId)) {
      switch (this.stateService.dropdownPosition) {
        case "top":
          this.renderer.setStyle(this.dropdown, "bottom", `${this.el.nativeElement.clientHeight + 10}px`);
          break;
        case "bottom":
          this.renderer.removeStyle(this.dropdown, "bottom");
          break;
        default:
          this.setPosition();
          this.calcSelectorPosition();
          break;
      }
    }
  }

  private calcSelectorPosition(): void {
    this.renderer.listen(document, "scrollend", () => {
      this.ngZone.runOutsideAngular(() => {
        this.setPosition();
      });
    });
  }

  private setPosition(): void {
    if (this.stateService.pickerDisplayMethod === "inline") {
      return;
    }
    const rect = this.el.nativeElement.getBoundingClientRect();
    const distanceFromBottom = window.innerHeight - rect.bottom;
    if (distanceFromBottom > 0) {
      if (distanceFromBottom >= 270) {
        this.renderer.removeStyle(this.dropdown, "bottom");
        return;
      } else {
        this.renderer.setStyle(this.dropdown, "bottom", `${this.el.nativeElement.clientHeight + 10}px`);
      }
    }
  }
}
