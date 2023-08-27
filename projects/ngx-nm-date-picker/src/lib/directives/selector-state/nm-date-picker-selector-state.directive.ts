import { Directive, ElementRef, Input, NgZone, OnDestroy, Renderer2 } from "@angular/core";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";
import { NM_SELECTOR_STATES } from "../../constants/selector-states.enum";
import { isTriggerDescendant } from "../../utils/checkParentNode";

@Directive({
  selector: "[nmDatePickerSelectorState]",
})
export class NmDatePickerSelectorStateDirective implements OnDestroy {
  private unlistenDocumentClick!: () => void;
  private unlistenElementClick!: () => void;

  @Input() dropdownPicker!: HTMLDivElement;

  constructor(
    private el: ElementRef<HTMLDivElement>,
    private readonly stateService: NmDatePickerStateService,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {
    this.createActionInstances();
  }

  ngOnDestroy(): void {
    this.unlistenDocumentClick();
    this.unlistenElementClick();
  }

  private createActionInstances(): void {
    this.unlistenDocumentClick = this.renderer.listen(document, "click", (event: PointerEvent) => {
      this.ngZone.runOutsideAngular(() => {
        if ((this.dropdownPicker && this.dropdownPicker.contains(event.target as Node)) || isTriggerDescendant(event.target as HTMLElement)) {
          return;
        }
        if (this.el.nativeElement.contains(event.target as Node)) {
          return;
        }
        if (this.stateService.dropdownSelectorState$.value === NM_SELECTOR_STATES.ACTIVE) {
          this.stateService.dropdownSelectorState$.next(NM_SELECTOR_STATES.INACTIVE);
          this.stateService.pickerMode$.next(this.stateService.pickerModeLimitedBy);
          if (this.stateService.selectedDate) this.stateService.displayDate = new Date(this.stateService.selectedDate);
        }
      });
    });

    this.unlistenElementClick = this.renderer.listen(this.el.nativeElement, "click", () => {
      this.ngZone.runOutsideAngular(() => {
        if (this.stateService.dropdownSelectorState$.value !== NM_SELECTOR_STATES.ACTIVE) {
          this.stateService.dropdownSelectorState$.next(NM_SELECTOR_STATES.ACTIVE);
        }
      });
    });
  }
}
