import { checkForDisabledMonth, checkForDisabledYear } from "../utils/checkDisabled";

export interface NmDateInterface {
  date: Date;
  isPrevMarker: boolean;
  isNextMarker: boolean;
  disabled: boolean;
  isToday: boolean;
  isSelected: boolean;
  isWeekend: boolean;
  displayName?: string;
}

export class NmDate implements NmDateInterface {
  date: Date;
  isPrevMarker = false;
  isNextMarker = false;
  disabled = false;
  isToday = false;
  isSelected = false;
  isWeekend = false;
  displayName?: string;

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

  setDisplayName(name: string): this {
    this.displayName = name;
    return this;
  }

  setDisabledState(checker: (date: Date) => boolean): this {
    this.disabled = checker(this.date);
    return this;
  }

  setDisabledYear(checker: (date: Date) => boolean): this {
    this.disabled = checkForDisabledYear(checker, this.date.getFullYear());
    return this;
  }

  setDisabledMonth(checker: (date: Date) => boolean): this {
    this.disabled = checkForDisabledMonth(checker, this.date.getMonth(), this.date.getFullYear());
    return this;
  }
}
