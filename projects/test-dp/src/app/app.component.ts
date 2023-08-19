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

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public LOCALIZATION_FRENCH = LOCALIZATION_FRENCH;
  public date: Date = new Date();
  public date2: Date | null = null;
  private minDateValue = 1692475200000;
  private maxDateValue = 1693339200000;
  log(date: Date) {
    console.log(date, "onCahnge");
  }

  public disabledDates: (date: Date) => boolean = (date: Date) => {
    return date.getTime() < this.minDateValue || date.getTime() > this.maxDateValue || date.getTime() === 1692907200000;
  };

  // get url(): string {
  //   return `url(${this.image})`;
  // }
}
