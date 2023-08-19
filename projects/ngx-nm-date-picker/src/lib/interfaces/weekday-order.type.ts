import { NmHolidaysDisplayType } from "./holiday-display.type";

export type NmWeekdayOrderType = {
  [key in NmHolidaysDisplayType]: number[];
};
