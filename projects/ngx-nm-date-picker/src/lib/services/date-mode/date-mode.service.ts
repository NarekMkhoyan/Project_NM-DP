import { Injectable } from "@angular/core";
import { NmDatePickerStateService } from "../state/nm-date-picker-state.service";
import { NmHolidaysDisplayType } from "../../interfaces/holiday-display.type";
import { NM_FALLBACK_LANGUAGE } from "../../constants/localization.constant";
import { NM_WEEKDAY_ORDER } from "../../constants/weekday-order.constant";
import { NmWeekday } from "../../interfaces/weekdays.interface";
import { NmLanguageType } from "../../interfaces/language.type";
import { NmDate } from "../../interfaces/date.interface";
import { isSameDay } from "../../utils/dateCompare";

@Injectable()
export class DateModeService {
  constructor(private readonly stateService: NmDatePickerStateService) {}

  public generateDays = (date: Date, holidaysDisplayMethod: NmHolidaysDisplayType): NmDate[] => {
    const dayInMs = 86400000;
    const dateCopy = new Date(date);

    const startOfTheMonth = new Date(new Date(dateCopy.setDate(1)).setHours(0, 0, 0, 0)).getTime();
    const endOfTheMonth = new Date(
      new Date(new Date(dateCopy.setMonth(dateCopy.getMonth() + 1)).setDate(0)).setHours(0, 0, 0, 0)
    ).getTime();

    const firstDayIndex = new Date(startOfTheMonth).getDay();
    const lastDayIndex = new Date(endOfTheMonth).getDay();

    const currentMonth: NmDate[] = new Array(Math.round((endOfTheMonth - startOfTheMonth) / dayInMs) + 1)
      .fill(startOfTheMonth)
      .map((date, index) => {
        const calculatedDate = new Date(date + index * dayInMs);
        const dateObject = new NmDate(calculatedDate)
          .setDisabledState(this.stateService.disabledDateFunction)
          .setDisabledStateInRangeMode(this.stateService)
          .setHighlightedDay(this.stateService.highlightedDatesFunction);
        if (isSameDay(new Date(), calculatedDate)) {
          dateObject.setAsToday();
        }
        return dateObject;
      });

    let firstDayOffset: number;
    let lastDayOffset: number;
    switch (holidaysDisplayMethod) {
      case "start":
        firstDayOffset = NM_WEEKDAY_ORDER.start.indexOf(firstDayIndex);
        lastDayOffset = NM_WEEKDAY_ORDER.start.indexOf(lastDayIndex);
        break;
      case "split":
        firstDayOffset = NM_WEEKDAY_ORDER.split.indexOf(firstDayIndex);
        lastDayOffset = NM_WEEKDAY_ORDER.split.indexOf(lastDayIndex);
        break;
      case "end":
      default:
        firstDayOffset = NM_WEEKDAY_ORDER.end.indexOf(firstDayIndex);
        lastDayOffset = NM_WEEKDAY_ORDER.end.indexOf(lastDayIndex);
        break;
    }

    const prevMonthDays = new Array(firstDayOffset)
      .fill(new Date())
      .map((date, index) => {
        const dateObject = new NmDate(
          new Date(new Date(startOfTheMonth).setDate(new Date(startOfTheMonth).getDate() - (index + 1)))
        )
          .setAsPrevMarker()
          .setDisabledState(this.stateService.disabledDateFunction)
          .setHighlightedDay(this.stateService.highlightedDatesFunction);
        return dateObject;
      })
      .reverse();

    const roundedOffset = 42 - [...prevMonthDays, ...currentMonth].length;

    const nextMonth = new Array(roundedOffset).fill(new Date()).map((date, index) => {
      const dateObject = new NmDate(
        new Date(new Date(endOfTheMonth).setDate(new Date(endOfTheMonth).getDate() + (index + 1)))
      )
        .setAsNextMarker()
        .setDisabledState(this.stateService.disabledDateFunction)
        .setHighlightedDay(this.stateService.highlightedDatesFunction);
      return dateObject;
    });

    return [...prevMonthDays, ...currentMonth, ...nextMonth];
  };

  public generateWeekdays = (holidaysDisplayMethod: NmHolidaysDisplayType, language: NmLanguageType): NmWeekday[] => {
    let weekdays: NmWeekday[] = [];
    let weekDayNames = this.stateService.localization[NM_FALLBACK_LANGUAGE].WEEKDAY_NAMES_SHORT;
    if (this.stateService.localization[language]) {
      weekDayNames = this.stateService.localization[language].WEEKDAY_NAMES_SHORT;
    }

    switch (holidaysDisplayMethod) {
      case "start":
        weekdays = NM_WEEKDAY_ORDER.start.map((index) => new NmWeekday(weekDayNames, index));
        break;
      case "end":
        weekdays = NM_WEEKDAY_ORDER.end.map((index) => new NmWeekday(weekDayNames, index));
        break;
      case "split":
        weekdays = NM_WEEKDAY_ORDER.split.map((index) => new NmWeekday(weekDayNames, index));
        break;
    }

    return weekdays;
  };

  public updateSelected(dates: NmDate[]): NmDate[] {
    const updatedDates = dates.map((date) => {
      if (this.stateService.rangeSelectionActive) {
        if (
          (this.stateService.selectedDateRange[0] && isSameDay(this.stateService.selectedDateRange[0], date.date)) ||
          (this.stateService.selectedDateRange[1] && isSameDay(this.stateService.selectedDateRange[1], date.date))
        ) {
          date.setSelected(true);
        } else {
          date.setSelected(false);
        }
      } else if (this.stateService.nmMultiDateSelect) {
        const amongSelected = this.stateService.selectedDatesArray.find((selectedDate) =>
          isSameDay(selectedDate, date.date)
        );
        if (amongSelected) {
          date.setSelected(true);
        } else {
          date.setSelected(false);
        }
      } else if (this.stateService.selectedDate) {
        if (isSameDay(this.stateService.selectedDate, date.date)) {
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
