import { Injectable } from "@angular/core";
import { NmDatePickerStateService } from "../state/nm-date-picker-state.service";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";
import { HeaderAction } from "../../interfaces/header-action.interface";
import { isSameMonth } from "../../utils/dateCompare";

@Injectable()
export class NmDatePickerHeaderService {
  private mode: NmDatePickerModeType = "date";
  constructor(private readonly stateService: NmDatePickerStateService) {}

  public generateHeaderActionButtons(pickerMode: NmDatePickerModeType): void {
    this.mode = pickerMode;
    if (this.stateService.headerActions.length === 0) {
      this.stateService.headerActions = [
        new HeaderAction().setOnClickHandler(this.prevActionHandler),
        new HeaderAction().setOnClickHandler(this.nextActionHandler),
      ];
    }
    this.checkForMinMaxRange(pickerMode);
  }

  private prevActionHandler: () => void = () => {
    const copy = new Date(this.stateService.displayDate);
    let newDate: number;
    switch (this.mode) {
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
  };

  private nextActionHandler: () => void = () => {
    const copy = new Date(this.stateService.displayDate);
    let newDate: number;
    switch (this.mode) {
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
  };

  private updateSelectedDate(newValue: number): void {
    this.stateService.displayDate = new Date(newValue);
    this.stateService.updatePicker$.next();
  }

  private checkForMinMaxRange(pickerMode: NmDatePickerModeType): void {
    const [prevBtn, nextBtn] = this.stateService.headerActions;
    if (!prevBtn || !nextBtn) {
      return;
    }
    switch (pickerMode) {
      case "date":
        if (this.stateService.nmMinDate) {
          const isSameMonthWithMin = isSameMonth(this.stateService.displayDate, this.stateService.nmMinDate);
          if (isSameMonthWithMin) {
            prevBtn.disabled = true;
          } else {
            prevBtn.disabled = false;
          }
        } else {
          prevBtn.disabled = false;
        }

        if (this.stateService.nmMaxDate) {
          const isSameMonthWithMax = isSameMonth(this.stateService.nmMaxDate, this.stateService.displayDate);
          if (isSameMonthWithMax) {
            nextBtn.disabled = true;
          } else {
            nextBtn.disabled = false;
          }
        } else {
          nextBtn.disabled = false;
        }
        break;
      case "month":
        if (this.stateService.nmMinDate) {
          const difference = this.stateService.displayDate.getFullYear() - this.stateService.nmMinDate.getFullYear();
          if (difference <= 0) {
            prevBtn.disabled = true;
          } else {
            prevBtn.disabled = false;
          }
        } else {
          prevBtn.disabled = false;
        }

        if (this.stateService.nmMaxDate) {
          const difference = this.stateService.nmMaxDate.getFullYear() - this.stateService.displayDate.getFullYear();
          if (difference <= 0) {
            nextBtn.disabled = true;
          } else {
            nextBtn.disabled = false;
          }
        } else {
          nextBtn.disabled = false;
        }
        break;

      case "year":
        if (!this.stateService.decadeMarkingYear) {
          return;
        }
        const currentYear = this.stateService.displayDate
          ? this.stateService.displayDate.getFullYear()
          : new Date().getFullYear();
        const decadeMarkingYear = currentYear + 10 - Number(String(currentYear).slice(3));
        if (this.stateService.nmMinDate) {
          const difference = decadeMarkingYear - this.stateService.nmMinDate.getFullYear();
          if (difference < 11) {
            prevBtn.disabled = true;
          } else {
            prevBtn.disabled = false;
          }
        } else {
          prevBtn.disabled = false;
        }

        if (this.stateService.nmMaxDate) {
          const difference = this.stateService.nmMaxDate.getFullYear() - decadeMarkingYear;
          if (difference < 0) {
            nextBtn.disabled = true;
          } else {
            nextBtn.disabled = false;
          }
        } else {
          nextBtn.disabled = false;
        }
    }
  }
}
