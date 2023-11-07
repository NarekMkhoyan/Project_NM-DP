import { Injectable } from "@angular/core";
import { NmDatePickerStateService } from "../state/nm-date-picker-state.service";
import { divideIntoChunks } from "../../utils/chunkDivider";
import { NmDate } from "../../interfaces/date.interface";
import { isSameYear } from "../../utils/dateCompare";

@Injectable()
export class YearModeService {
  constructor(private readonly stateService: NmDatePickerStateService) {}

  public generateYears(): NmDate[][] {
    this.setDecadeMarker();
    let years: NmDate[] = new Array(12).fill(null);
    const copy = new Date(new Date(this.stateService.displayDate).setHours(0, 0, 0, 0));
    years = years
      .map((year, index, arr) => {
        const dateObject = new NmDate(
          new Date(copy.setFullYear(this.stateService.decadeMarkingYear - index))
        ).setDisabledYear(this.stateService.disabledDateFunction);
        if (index === 0) {
          dateObject.setAsNextMarker();
        }
        if (index === arr.length - 1) {
          dateObject.setAsPrevMarker();
        }
        return dateObject;
      })
      .reverse();

    return divideIntoChunks<NmDate>(this.updateSelectedYear(years), 4, 3);
  }

  public setDecadeMarker(): void {
    const currentYear = this.stateService.displayDate
      ? this.stateService.displayDate.getFullYear()
      : new Date().getFullYear();
    this.stateService.decadeMarkingYear = currentYear + 10 - Number(String(currentYear).slice(3));
  }

  private updateSelectedYear(years: NmDate[]): NmDate[] {
    const updatedDates = years.map((date) => {
      if (this.stateService.rangeSelectionActive) {
        if (
          (this.stateService.selectedDateRange[0] && isSameYear(this.stateService.selectedDateRange[0], date.date)) ||
          (this.stateService.selectedDateRange[1] && isSameYear(this.stateService.selectedDateRange[1], date.date))
        ) {
          date.setSelected(true);
        } else {
          date.setSelected(false);
        }
      } else if (this.stateService.nmMultiDateSelect) {
        const amongSelected = this.stateService.selectedDatesArray.find((selectedDate) =>
          isSameYear(selectedDate, date.date)
        );
        if (amongSelected) {
          date.setSelected(true);
        } else {
          date.setSelected(false);
        }
      } else if (this.stateService.selectedDate) {
        if (isSameYear(this.stateService.selectedDate, date.date)) {
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
