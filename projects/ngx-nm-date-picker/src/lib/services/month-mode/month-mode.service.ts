import { Injectable } from "@angular/core";
import { NmDatePickerStateService } from "../state/nm-date-picker-state.service";
import { NmLanguageType } from "../../interfaces/language.type";
import { divideIntoChunks } from "../../utils/chunkDivider";
import { NmDate } from "../../interfaces/date.interface";
import { isSameMonth } from "../../utils/dateCompare";

@Injectable()
export class NmDatePickerMonthModeService {
  constructor(private readonly stateService: NmDatePickerStateService) {}

  public generateMonths(language: NmLanguageType): NmDate[][] {
    const copy = new Date(this.stateService.displayDate);
    const months = this.stateService.localization[language].MONTH_NAMES_SHORT.map((month, index) => {
      const dateObject = new NmDate(new Date(copy.setMonth(index)))
        .setDisplayName(month)
        .setDisabledMonth(this.stateService.disabledDateFunction);
      return dateObject;
    });
    return divideIntoChunks<NmDate>(this.updateSelectedMonth(months), 4, 3);
  }

  private updateSelectedMonth(dates: NmDate[]): NmDate[] {
    const updatedDates = dates.map((date) => {
      if (this.stateService.rangeSelectionActive && date.date) {
        if (
          (this.stateService.selectedDateRange[0] && isSameMonth(this.stateService.selectedDateRange[0], date.date)) ||
          (this.stateService.selectedDateRange[1] && isSameMonth(this.stateService.selectedDateRange[1], date.date))
        ) {
          date.setSelected(true);
        } else {
          date.setSelected(false);
        }
      } else if (this.stateService.selectedDate && date.date) {
        if (isSameMonth(this.stateService.selectedDate, date.date)) {
          date.setSelected(true);
        } else {
          date.setSelected(false);
        }
      }
      return date;
    });
    return updatedDates;
  }
}
