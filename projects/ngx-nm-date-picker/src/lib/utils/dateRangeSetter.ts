import { getLastDayOfMonth, getLastDayOfYear } from "./lastDay";

export const dateRangeSetter: (
  dateRange: [Date | null, Date | null],
  selectedDate: Date
) => [Date | null, Date | null] = (dateRange: [Date | null, Date | null], selectedDate: Date) => {
  let [startDate, endDate] = dateRange;

  if (!startDate) {
    startDate = new Date(new Date(selectedDate).setHours(0, 0, 0, 0));
  } else {
    if (endDate) {
      startDate = new Date(new Date(selectedDate).setHours(0, 0, 0, 0));
      endDate = null;
    } else {
      if (selectedDate < startDate) {
        const startDateCopy = new Date(startDate);
        startDate = new Date(new Date(selectedDate).setHours(0, 0, 0, 0));
        endDate = new Date(new Date(startDateCopy).setHours(23, 59, 59, 999));
      } else {
        endDate = new Date(new Date(selectedDate).setHours(23, 59, 59, 999));
      }
    }
  }

  return [startDate, endDate];
};

export const monthRangeSetter: (
  dateRange: [Date | null, Date | null],
  selectedDate: Date
) => [Date | null, Date | null] = (dateRange: [Date | null, Date | null], selectedDate: Date) => {
  let [startMonth, endMonth] = dateRangeSetter(dateRange, selectedDate);
  if (startMonth) {
    startMonth.setDate(1);
    startMonth.setHours(0, 0, 0, 0);
  }
  if (endMonth) {
    endMonth = new Date(getLastDayOfMonth(endMonth));
  }
  return [startMonth, endMonth];
};

export const yearRangeSetter: (
  dateRange: [Date | null, Date | null],
  selectedDate: Date
) => [Date | null, Date | null] = (dateRange: [Date | null, Date | null], selectedDate: Date) => {
  let [startYear, endYear] = dateRangeSetter(dateRange, selectedDate);
  if (startYear) {
    startYear.setMonth(0);
    startYear.setDate(1);
    startYear.setHours(0, 0, 0, 0);
  }
  if (endYear) {
    endYear = new Date(getLastDayOfYear(endYear));
  }
  return [startYear, endYear];
};
