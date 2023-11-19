export const getLastDayOfMonth: (date: Date) => Date = (date: Date) => {
  const lastDayInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  lastDayInMonth.setHours(23, 59, 59, 999);
  return lastDayInMonth;
};

export const getLastDayOfYear: (date: Date) => Date = (date: Date) => {
  const lastDayInYear = new Date(date.getFullYear() + 1, 0, 0);
  lastDayInYear.setHours(23, 59, 59, 999);
  return lastDayInYear;
};
