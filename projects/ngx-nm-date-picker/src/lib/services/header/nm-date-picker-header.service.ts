import { Injectable } from "@angular/core";
import { NmDatePickerStateService } from "../state/nm-date-picker-state.service";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";

@Injectable()
export class NmDatePickerHeaderService {
  constructor(private readonly stateService: NmDatePickerStateService) {}

  public prevActionHandler(mode: NmDatePickerModeType): void {
    const copy = new Date(this.stateService.displayDate);
    let newDate: number;
    switch (mode) {
      case "date":
        newDate = copy.setMonth(copy.getMonth() - 1);
        break;
      case "month":
        newDate = copy.setFullYear(copy.getFullYear() - 1);
        break;
      case "year":
        newDate = copy.setFullYear(copy.getFullYear() - 10);
        break;
    }
    this.updateSelectedDate(newDate);
  }

  public nextActionHandler(mode: NmDatePickerModeType): void {
    const copy = new Date(this.stateService.displayDate);
    let newDate: number;
    switch (mode) {
      case "date":
        newDate = copy.setMonth(copy.getMonth() + 1);
        break;
      case "month":
        newDate = copy.setFullYear(copy.getFullYear() + 1);
        break;
      case "year":
        newDate = copy.setFullYear(copy.getFullYear() + 10);
        break;
    }
    this.updateSelectedDate(newDate);
  }

  private updateSelectedDate(newValue: number): void {
    this.stateService.displayDate = new Date(newValue);
    this.stateService.updatePicker$.next();
  }
}
