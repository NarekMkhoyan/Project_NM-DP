import { Component } from "@angular/core";
import { NmLocalizationType } from "ngx-nm-date-picker";

const LOCALIZATION_FRENCH: NmLocalizationType = {
  fr: {
    WEEKDAY_NAMES_SHORT: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
    MONTH_NAMES_DECLENSED: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
    MONTH_NAMES_SHORT: ["janv", "févr", "mars", "avr", "mai", "juin", "juil", "aout", "sept", "oct", "nov", "déc"],
  },
};

const holidays: Date[] = [
  new Date("12.31.2023"),
  new Date("01.01.2023"),
  new Date("01.02.2023"),
  new Date("01.03.2023"),
  new Date("01.04.2023"),
  new Date("01.05.2023"),
  new Date("01.06.2023"),
  new Date("01.28.2023"),
  new Date("03.08.2023"),
  new Date("05.01.2023"),
  new Date("05.09.2023"),
  new Date("05.28.2023"),
  new Date("05.28.2023"),
  new Date("07.05.2023"),
  new Date("09.21.2023"),
];
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public LOCALIZATION_FRENCH = LOCALIZATION_FRENCH;
  public now = new Date("2019");
  public max = new Date("2043");
  public date: Date = new Date();
  public date2: Date | null = null;
  private minDateValue = 1692475200000;
  private maxDateValue = 1693339200000;
  private armenianHolidays = holidays;
  log(date: Date) {
    console.log(date, "onCahnge");
  }

  public disabledDates: (date: Date) => boolean = (date: Date) => {
    return date.getTime() < this.minDateValue || date.getTime() > this.maxDateValue || date.getTime() === 1692907200000;
  };

  public datesHighlightFn: (date: Date) => boolean = (date: Date) => {
    return !!this.armenianHolidays.find(
      (holiday) => holiday.getMonth() === date.getMonth() && holiday.getDate() === date.getDate()
    );
  };

  // get url(): string {
  //   return `url(${this.image})`;
  // }
}
