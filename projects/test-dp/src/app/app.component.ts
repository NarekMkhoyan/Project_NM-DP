import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import {
  IHeaderActions,
  NmDateInterface,
  NmDatePickerComponent,
  NmLocalizationType,
} from "ngx-nm-date-picker";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  public LOCALIZATION_FRENCH = LOCALIZATION_FRENCH;
  public now = new Date("2019");
  public max = new Date("2043");
  public date: Date = new Date();
  public date2: Date | null = null;
  public date3: Date | null = new Date();
  private minDateValue = 1692475200000;
  private maxDateValue = 1693339200000;
  private armenianHolidays = holidays;
  public form!: FormGroup;

  @ViewChild("customNmDatePicker") customNmDatePicker!: NmDatePickerComponent;
  @ViewChild("customCalendarPicker") customCalendarPicker!: NmDatePickerComponent;

  log(date: Date) {
    console.log(date, "onCahnge");
  }

  get dateCOntrol(): AbstractControl<Date> | null {
    return this.form.get("date");
  }

  get nmHeaderActions(): IHeaderActions | null {
    if (!this.customNmDatePicker) {
      return null;
    }
    return this.customNmDatePicker.nmPublicApiService.nmHeaderActions;
  }

  get nmCalendarHeaderActions(): IHeaderActions | null {
    if (!this.customCalendarPicker) {
      return null;
    }
    return this.customCalendarPicker.nmPublicApiService.nmHeaderActions;
  }

  get calendarWidth(): number {
    return (document.body.clientWidth - 30) / 7;
  }

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      date: ["", [Validators.required, this.dateArrayValidator()]],
    });

    this.form.valueChanges.subscribe((form) => {

    });

  }


  ngAfterViewInit(): void {
    // this.customNmDatePicker.nmPublicApiService.nmDropdownOpenEvent$.subscribe(() => console.log('open'));
    // this.customNmDatePicker.nmPublicApiService.nmDropdownCloseEvent$.subscribe(() => console.log('close'));
    // this.customNmDatePicker.nmPublicApiService.nmNextActionTriggered$.subscribe(() => console.log('next'));
    // this.customNmDatePicker.nmPublicApiService.nmPrevActionTriggered$.subscribe(() => console.log('prev'));
    // this.customNmDatePicker.nmPublicApiService.nmPickerCurrentMode$.subscribe((mode) => console.log('Mode: ' + mode));
  }

  private dateCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        console.log(control.value);

        const inValid = control.value.getFullYear() > 2030 || String(this.dateCOntrol?.value.getDate()).includes("4");
        return inValid ? { value: "Invalid date" } : null;
      }
      return null;
    };
  }

  private dateArrayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dates: [Date, Date] = control.value;
      if (dates) {
        const inValid = dates[0].getFullYear() >= 2024 && dates[1].getFullYear() <= 2030;
        return inValid ? { value: "Invalid date" } : null;
      }
      return null;
    };
  }

  public disabledDates: (date: Date) => boolean = (date: Date) => {
    return date.getTime() < this.minDateValue || date.getTime() > this.maxDateValue || date.getTime() === 1692907200000;
  };

  public datesHighlightFn: (date: Date, nmDateObject: NmDateInterface) => boolean = (
    date: Date,
    nmDateObject: NmDateInterface
  ) => {
    const isArmenianholiday = !!this.armenianHolidays.find(
      (holiday) => holiday.getMonth() === date.getMonth() && holiday.getDate() === date.getDate()
    );
    if (isArmenianholiday) {
      switch (date.getDate()) {
        case 2:
          nmDateObject.customTextColor = "#097255";
          nmDateObject.customBackgroundColor = "#c8e5d0";
          break;
        case 3:
          nmDateObject.customTextColor = "#800080";
          nmDateObject.customBackgroundColor = "#ffc0cb";
          break;
        case 4:
          nmDateObject.customTextColor = "#440ab8";
          nmDateObject.customBackgroundColor = "#d3c8e5";
          break;
        case 5:
          nmDateObject.customTextColor = "#ffffff";
          nmDateObject.customBackgroundColor = "#50c8ff";
          break;
      }
    }
    return isArmenianholiday;
  };

  // get url(): string {
  //   return `url(${this.image})`;
  // }
}
