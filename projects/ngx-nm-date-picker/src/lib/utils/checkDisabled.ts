export const checkForDisabledYear: (dayChecker: (date: Date) => boolean, year: number) => boolean = (
  dayChecker: (date: Date) => boolean,
  year: number
) => {
  let yearDisabled = true;
  let dateToCheck = new Date(new Date(0).setFullYear(year));
  while (yearDisabled && dateToCheck.getFullYear() === year) {
    const isDayDisabled = dayChecker(dateToCheck);
    if (isDayDisabled) {
      dateToCheck = new Date(new Date(dateToCheck).setDate(dateToCheck.getDate() + 1));
    } else {
      yearDisabled = false;
    }
  }

  return yearDisabled;
};

export const checkForDisabledMonth: (
  dayChecker: (date: Date) => boolean,
  monthIndex: number,
  year: number
) => boolean = (dayChecker: (date: Date) => boolean, monthIndex: number, year: number) => {
  let monthDisabled = true;
  let dateToCheck = new Date(new Date(new Date(0).setMonth(monthIndex)).setFullYear(year));
  while (monthDisabled && dateToCheck.getFullYear() === year && dateToCheck.getMonth() === monthIndex) {
    const isDayDisabled = dayChecker(dateToCheck);
    if (isDayDisabled) {
      dateToCheck = new Date(new Date(dateToCheck).setDate(dateToCheck.getDate() + 1));
    } else {
      monthDisabled = false;
    }
  }

  return monthDisabled;
};
