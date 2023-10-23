import { Injectable } from "@angular/core";
import { HeaderAction, HeaderActions } from "../../interfaces/header-action.interface";
import { NmDatePickerStateService } from "../state/nm-date-picker-state.service";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";
import { NmPublicApiService } from "../public-apis/public-apis.service";
import { isSameMonth } from "../../utils/dateCompare";

@Injectable()
export class NmDatePickerHeaderService {
  private mode: NmDatePickerModeType = "date";
  constructor(
    private readonly stateService: NmDatePickerStateService,
    private readonly publicApisService: NmPublicApiService
  ) {}

  public generateHeaderActionButtons(pickerMode: NmDatePickerModeType): void {
    this.mode = pickerMode;
    if (this.publicApisService.headerActions === null) {
      this.publicApisService.headerActions = new HeaderActions(
        new HeaderAction(this.stateService.displayDate).setOnClickHandler(this.nextActionHandler),
        new HeaderAction(this.stateService.displayDate).setOnClickHandler(this.prevActionHandler),
        new HeaderAction(this.stateService.displayDate).setOnClickHandler(() => this.setPickerMode("month")),
        new HeaderAction(this.stateService.displayDate).setOnClickHandler(() => this.setPickerMode("year"))
      );
    }
    this.checkForMinMaxRange(pickerMode);
  }

  private setPickerMode(pickerMode: NmDatePickerModeType): void {
    this.stateService.pickerMode$.next(pickerMode);
    this.stateService.updatePicker$.next();
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
    this.updateHeaderActionDisplayDates(new Date(newValue));
    this.stateService.displayDate = new Date(newValue);
    this.stateService.updatePicker$.next();
  }

  private checkForMinMaxRange(pickerMode: NmDatePickerModeType): void {
    if (this.publicApisService.headerActions === null) {
      return;
    }
    const { prevAction, nextAction } = this.publicApisService.headerActions;
    switch (pickerMode) {
      case "date":
        if (this.stateService.nmMinDate) {
          const isSameMonthWithMin = isSameMonth(this.stateService.displayDate, this.stateService.nmMinDate);
          if (isSameMonthWithMin) {
            prevAction.disabled = true;
          } else {
            prevAction.disabled = false;
          }
        } else {
          prevAction.disabled = false;
        }

        if (this.stateService.nmMaxDate) {
          const isSameMonthWithMax = isSameMonth(this.stateService.nmMaxDate, this.stateService.displayDate);
          if (isSameMonthWithMax) {
            nextAction.disabled = true;
          } else {
            nextAction.disabled = false;
          }
        } else {
          nextAction.disabled = false;
        }
        break;
      case "month":
        if (this.stateService.nmMinDate) {
          const difference = this.stateService.displayDate.getFullYear() - this.stateService.nmMinDate.getFullYear();
          if (difference <= 0) {
            prevAction.disabled = true;
          } else {
            prevAction.disabled = false;
          }
        } else {
          prevAction.disabled = false;
        }

        if (this.stateService.nmMaxDate) {
          const difference = this.stateService.nmMaxDate.getFullYear() - this.stateService.displayDate.getFullYear();
          if (difference <= 0) {
            nextAction.disabled = true;
          } else {
            nextAction.disabled = false;
          }
        } else {
          nextAction.disabled = false;
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
            prevAction.disabled = true;
          } else {
            prevAction.disabled = false;
          }
        } else {
          prevAction.disabled = false;
        }

        if (this.stateService.nmMaxDate) {
          const difference = this.stateService.nmMaxDate.getFullYear() - decadeMarkingYear;
          if (difference < 0) {
            nextAction.disabled = true;
          } else {
            nextAction.disabled = false;
          }
        } else {
          nextAction.disabled = false;
        }
    }
  }

  private updateHeaderActionDisplayDates(newDate: Date): void {
    if (!this.publicApisService.headerActions) {
      return;
    }
    const actions: HeaderActions = this.publicApisService.headerActions;
    for (const key in actions) {
      if (Object.prototype.hasOwnProperty.call(actions, key)) {
        (actions[key as keyof HeaderActions] as HeaderAction).setDisplayDate(newDate);
      }
    }
    this.publicApisService.headerActions = { ...actions };
  }
}
