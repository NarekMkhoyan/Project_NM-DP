import { Directive, HostBinding } from "@angular/core";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";

@Directive({
  selector: "[nmTrigger]",
})
export class NmTriggerDirective {
  @HostBinding("class.nmTrigger") get displayMethod() {
    return this.stateService.pickerDisplayMethod === "dropdown";
  }

  constructor(private readonly stateService: NmDatePickerStateService) {}
}
