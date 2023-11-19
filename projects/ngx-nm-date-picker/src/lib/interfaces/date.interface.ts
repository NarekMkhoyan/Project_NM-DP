import { NmDatePickerStateService } from "../services/state/nm-date-picker-state.service";
import { checkForDisabledMonth, checkForDisabledYear } from "../utils/checkDisabled";

export interface NmDateInterface {
  date: Date;
  isPrevMarker: boolean;
  isNextMarker: boolean;
  disabled: boolean;
  isToday: boolean;
  isSelected: boolean;
  isWeekend: boolean;
  isHighlighted: boolean;
  monthName?: string;
  customTextColor: string | undefined;
  customBackgroundColor: string | undefined;
}

export class NmDate implements NmDateInterface {
  date: Date;
  isPrevMarker = false;
  isNextMarker = false;
  disabled = false;
  isToday = false;
  isSelected = false;
  isWeekend = false;
  isHighlighted = false;
  monthName?: string;
  customTextColor = undefined;
  customBackgroundColor = undefined;

  constructor(value: Date) {
    this.date = value;
    this.setWeekend(value);
  }

  setAsNextMarker(): this {
    this.isNextMarker = true;
    return this;
  }

  setAsPrevMarker(): this {
    this.isPrevMarker = true;
    return this;
  }

  setSelected(state: boolean): this {
    this.isSelected = state;
    return this;
  }

  setAsToday(): this {
    this.isToday = true;
    return this;
  }

  setWeekend(value: Date): this {
    const weekDay = value.getDay();
    if (weekDay === 0 || weekDay === 6) {
      this.isWeekend = true;
    }
    return this;
  }

  setMonthName(name: string): this {
    this.monthName = name;
    return this;
  }

  setDisabledState(checker: null | ((date: Date) => boolean)): this {
    if (checker) {
      this.disabled = checker(this.date);
    }
    return this;
  }

  setDisabledYear(checker: null | ((date: Date) => boolean)): this {
    if (checker) {
      this.disabled = checkForDisabledYear(checker, this.date.getFullYear());
    }
    return this;
  }

  setDisabledMonth(checker: null | ((date: Date) => boolean)): this {
    if (checker) {
      this.disabled = checkForDisabledMonth(checker, this.date.getMonth(), this.date.getFullYear());
    }
    return this;
  }

  setDisabledStateInRangeMode(stateService: NmDatePickerStateService): this {
    if (stateService.rangeSelectionActive) {
      const [start, end] = stateService.selectedDateRange;
      if (end) {
        return this;
      }
      if (start) {
        if (this.date < start && this.disabled && !stateService.rangeLimits[0]) {
          stateService.rangeLimits[0] = this.date;
        } else if (
          this.date < start &&
          this.disabled &&
          stateService.rangeLimits[0] &&
          this.date > stateService.rangeLimits[0]
        ) {
          stateService.rangeLimits[0] = this.date;
        }
        if (this.date > start && this.disabled && !stateService.rangeLimits[1]) {
          stateService.rangeLimits[1] = this.date;
        }
        this.disabled =
          !!(stateService.rangeLimits[0] && this.date <= stateService.rangeLimits[0]) ||
          !!(stateService.rangeLimits[1] && this.date >= stateService.rangeLimits[1]);
      }
    }
    return this;
  }

  setHighlightedDay(highlighterFn: null | ((date: Date, nmDateObject: NmDateInterface) => boolean)): this {
    if (highlighterFn) {
      this.isHighlighted = highlighterFn(this.date, this);
    }
    return this;
  }
}
