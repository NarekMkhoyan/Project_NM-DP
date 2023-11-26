<div>
  <img style="display: block; margin: auto" src="./projects/shared/assets/nmDP-v2.png"/>
  <h2 style="text-align: center; margin: 0; margin-top: 14px;">nmDatePicker</h2>
</div>

nmDatePicker is a modern and highly customizable Angular date picker library with inclusive functionality.

Supported by Angular versions 15+


### Table of content

1. [Installation](#installation)
2. [API quick guide](#api-quick-guide)
2. [API docs](#api-docs)
4. [Custom templates](#custom-templates)
5. [Interfaces](#interfaces) 
        1. [NmDateInterface](#nmDateInterface) 
        2. [NmWeekdayInterface](#nmWeekdayInterface)
        3. [NmHeaderActionsGroup](#nmHeaderActionsGroup)
6. [Services](#services) 
        1. [Action notifier service](#action-notifier-service)
7. [License](#license)

### Installation {#installation}


To install the library run the command in you angular application directory.

```
$ npm install ngx-nm-date-picker
```

To use the component in the template you should import the module first.

```ts
import { NgxNmDatePickerModule } from 'ngx-nm-date-picker';

@NgModule({
 ...
  imports: [
    ...
    NgxNmDatePickerModule,
  ],
  ...
})
```
And in the template:

```html
 <nm-date-picker></nm-date-picker>
```


### API quick guide table {#api-quick-guide}

\* Click the property names for quick navigation.

| Property | Description | Type | Default Value |
| ----------- | ----------- | ----------- | ----------- |
| [`[nmDisplayMethod]`](#nmDisplayMethod) | sets the display method | `'inline' \| 'dropdown'` | `'dropdown'` |
| [`[nmPickerMode]`](#nmPickerMode) | sets the date picker operation mode | `'date' \| 'month' \| 'year'` | `'date'` |
| [`[nmDisabled]`](#nmDisabled) | sets the disabled state of the picker | `boolean` | `false` |
| [`[nmTheme]`](#nmTheme) | sets the color theme | `'light' \| 'dark'` | `'light'` |
| [`[nmMarkWeekends]`](#nmMarkWeekends) | enables the highlight of the weekends | `boolean` | `false` |
| [`[nmWeekendDisplayMethod]`](#nmWeekendDisplayMethod) | sets the color theme | `'start' \| 'end' \| 'split'` | `'end'` |
| [`[nmLanguage]`](#nmLanguage) | sets the picker locale | `NmLocalizationLanguageTypes` | `'en'` |
| [`[nmCustomLocalization]`](#nmCustomLocalization) | pass in a custom localization object | `NmLocalizationType` |  |
| [`[nmDisabledDates]`](#nmDisabledDates) | used to specify disabled dates | `(date: Date) => boolean` |  |
| [`[nmHighlightedDates]`](#nmHighlightedDates) | used to specify highlighted dates | `(date: Date, nmDateObject: NmDateInterface) => boolean)` |  |
| [`[nmMinDate]`](#nmMinDate) | sets the minimum limit of available dates | `Date \| null` | `null` |
| [`[nmMaxDate]`](#nmMaxDate) | sets the maximum limit of available dates | `Date \| null` | `null` |
| [`[nmRangeSelection]`](#nmRangeSelection) | enables the range selection mode | `boolean` | `false` |
| [`[nmMultiDateSelect]`](#nmMultiDateSelect) | enables the multi-date selection mode | `boolean` | `false` |
| [`[nmStatus]`](#nmStatus) | sets the date picker status | `'default' \| 'warning' \| 'error'` | `'default'` |
| [`[nmSelectorCustomLabel]`](#nmSelectorCustomLabel) | sets a custom label for the dropdown selector | `string \| null` | `null` |
| [`[nmSelectorDateFormat]`](#nmSelectorDateFormat) | sets the picker selector date format | `string \| null` | `null` |
| [`[nmAllowClear]`](#nmAllowClear) | enables the clear button on the dropdown selector | `boolean` | `true` |
| [`[nmDropdownPosition]`](#nmDropdownPosition) | sets the dropdown position | `'top' \| 'bottom' \| undefined` | `undefined` |

### API docs {#api-docs}

#### nmDisplayMethod {#nmDisplayMethod} 

`nmDisplayMethod: "inline" | "dropdown"`
Used to select one of the 2 supported display methods.
By default it is set to 'dropdown'
<img src="./projects/shared/assets/dropdown_inline.png" alt="Display methods demo"/>

#### nmPickerMode {#nmPickerMode} 

`nmPickerMode: "date" | "month" | "year"`
Used to pass in the date picker operation mode.
The operation modes work in a hierarchy.

1. date
2. month
3. year

This means that by passing an operation mode, the date picker will originally display in the set mode, and will be limited to that mode, but will still have access to the modes lower in the hierarchy.
**_\*Example:_** If you pass in ‘month’, the date picker will display in ‘month’ mode, but you will still be able to switch to the ‘year’ mode. (\* in default layout you will have no options to switch to the ‘date’ mode.
More about [custom layouts](#custom-templates))

<img src="./projects/shared/assets/operation_modes.png" alt="Operation modes demo"/>

Controls in the date picker header panel are used to switch between modes.

By default the date picker uses the ‘date’ mode, thus it has access to all 3 operation modes.

#### nmDisabled {#nmDisabled}

`nmDisabled: boolean`
A boolean value that sets the disabled state of the whole picker

#### nmTheme {#nmTheme}

`nmTheme: ‘light’ | ‘dark’`
Used to switch between light and dark themes.
By default the date picker uses the light theme variation.
<img src="./projects/shared/assets/light_mode.png" alt="Light mode demo"/>
<img src="./projects/shared/assets/dark_mode.png" alt="Dark mode demo"/>

\* Here are the default color variables used in the library

```scss
nm-date-picker {
  /* common colors */
  --nm-datepicker-white: #ffffff;
  --nm-datepicker-text-color-dark: #202020;
  --nm-datepicker-color-danger: #ff4d4f;
  --nm-datepicker-holiday-color: #ff4d4f;
  --nm-datepicker-highlight-color: #ff4d4f;

  /* light colors */
  --nm-datepicker-primary-color: #3794ff;
  --nm-datepicker-warning-color: #faad14;
  --nm-datepicker-error-color: #ff2d31;
  --nm-datepicker-inrange-cell-default-color: #e6f7ff;
  --nm-datepicker-inrange-cell-error-color: #ffe6e6;
  --nm-datepicker-inrange-cell-warning-color: #fff5e6;
  --nm-datepicker-text-color: #202020;
  --nm-datepicker-background-color: #f6f6f6;
  --nm-datepicker-hover-background-color: #0000000d;
  --nm-datepicker-text-color-disabled: #dedede;
  --nm-datepicker-color-danger-disabled: #ffbcbc;
  --nm-datepicker-holiday-color-disabled: #ffbcbc;
  --nm-datepicker-text-color-secondary: #808080;
  --nm-datepicker-disabled: grayscale(0.4) opacity(0.7);
}

[nm-theme="dark"] {
  --nm-datepicker-primary-color: #0672cb;
  --nm-datepicker-warning-color: #e09705;
  --nm-datepicker-error-color: #cd0003;
  --nm-datepicker-inrange-cell-default-color: #263653;
  --nm-datepicker-inrange-cell-error-color: #532626;
  --nm-datepicker-inrange-cell-warning-color: #534626;
  --nm-datepicker-text-color: #f6f6f6;
  --nm-datepicker-background-color: #0f172a;
  --nm-datepicker-hover-background-color: #ffffff4d;
  --nm-datepicker-text-color-disabled: #76777a;
  --nm-datepicker-color-danger-disabled: #992d2f;
  --nm-datepicker-holiday-color-disabled: #992d2f;
  --nm-datepicker-text-color-secondary: #b8b8b8;
  --nm-datepicker-disabled: grayscale(0.4) opacity(0.9);
}
```

\* You can also reassign color variables for each theme separately, using a css class.

**_Example:_**

```html
<nm-date-picker
  class="custom-date-picker-color"
  [nmTheme]="theme"
  [nmDisplayMethod]="'inline'"
  [(ngModel)]="date"
></nm-date-picker>
```

```scss
/* light mode variables */
.custom-date-picker-color {
  --nm-datepicker-primary-color: #ff37cd;
}

/* dark mode variables */
.custom-date-picker-color[nm-theme="dark"] {
  --nm-datepicker-primary-color: #06b47a;
}
```

**_Result:_**
<img src="./projects/shared/assets/light_custom_color.png" alt="Light mode with custom color"/> <img src="./projects/shared/assets/dark_custom_color.png" alt="Dark mode with custom color"/>

#### nmMarkWeekends {#nmMarkWeekends}

`nmMarkWeekends: boolean`
Used to enable the highlight of the weekends (the default highlight color is red)
<img src="./projects/shared/assets/weekend_highlight.png" alt="Highlighted weekends demo"/>

#### nmWeekendDisplayMethod {#nmWeekendDisplayMethod}

`nmWeekendDisplayMethod: 'start' | 'end' | 'split'`
Used to set the display method of weekend days (Saturday and Sunday).
By default the date picker uses the ‘end’ variation.
<img src="./projects/shared/assets/weekend_position.png" alt="Weekend display method demo" />

#### nmLanguage {#nmLanguage}

`nmLanguage: NmLocalizationLanguageTypes;`

```ts
type NmLocalizationLanguageTypes = "en" | "ru" | "am" | string;
```

**(\*type NmLocalizationLanguageTypescan be imported from the library)**
Used to set the current locale used on the date picker.
The library has in-build support for 3 languages and you can use them by passing the respective key to the [nmLanguage]:

- English (en) \* used by default
- Russian (ru)
- Armenian (am)

You can also pass in a custom language selector (string), if you are using [nmCustomLocalization](#nmCustomLocalization) to pass in a custom localization object.

#### nmCustomLocalization {#nmCustomLocalization}

`nmCustomLocalization: NmLocalizationType`
Used to pass in a custom localization object following the NmLocalizationType type

```ts
type NmLocalizationType = {
  [key in NmLocalizationLanguageTypes]: {
    WEEKDAY_NAMES_SHORT: string[];
    MONTH_NAMES_SHORT: string[];
    MONTH_NAMES: string[];
  };
};
```

**\*NmLocalizationType can be imported from the library**

- WEEKDAY_NAMES_SHORT - used for the weekday names in 'date' mode
- MONTH_NAMES_SHORT - used for month names in 'month' mode
- MONTH_NAMES - used for displaying the selected month name in the date picker selector (display method 'dropdown')

```ts
public LOCALIZATION_FRENCH: NmLocalizationType = {
  fr: {
    WEEKDAY_NAMES_SHORT: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
    MONTH_NAMES: [
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
```

```html
<nm-date-picker
  [nmLanguage]="'fr'"
  [nmCustomLocalization]="LOCALIZATION_FRENCH"
  [nmTheme]="'light'"
  [nmDisplayMethod]="'inline'"
  [(ngModel)]="date"
></nm-date-picker>
```

**_Result:_**
<img src="./projects/shared/assets/custom_locale.png" alt="Custom localization demo" />

\* If you use a key of an existing language settings (en | ru | am), you can overwrite the default values.

#### nmDisabledDates {#nmDisabledDates}

`nmDisabledDates: (date: Date) => boolean`
Accepts a callback function, that is applied to every date cell in the view
Receives the Date object of the cell, and must return a boolean value based on the evaluation that determines whether the cell is disabled or not.

```ts
private minDateValue: Date = new Date("2023.11.8"); // November 8, 2023
private maxDateValue: Date = new Date("2023.11.22"); // November 22, 2023

disabledDates: (date: Date) => boolean = (date: Date) => {
  return date < this.minDateValue || date > this.maxDateValue;
};
// Dates before the minDateValue and dates after the maxDateValue will be disabled
```

**_Output_**

<img src="./projects/shared/assets/disabled_dates.png" alt="Date picker with disabled dates demo"/>

\* When nmRangeSelection is active the date picker won't let you select date ranges that include disabled dates in between the range start and end dates. When selecting the start date the picker will disable all invalid options, leaving only the valid range end options. Upon selecting the end date the picker will revert back. 

<img src="./projects/shared/assets/disabled_range.gif" />

#### nmHighlightedDates {#nmHighlightedDates}

`nmHighlightedDates: (date: Date, nmDateObject: NmDateInterface) => boolean`
Accepts a callback function, that is applied to every date cell in the view.
Receives the Date object of the cell and the nmDate object, and must return a boolean value based on the evaluation that determines whether the cell should be highlighted or not.

```ts
private holidays: Date[] = [
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

public datesHighlightFn: (date: Date) => boolean = (date: Date) => {
  return !!this.holidays.find(
    (holiday) => holiday.getMonth() === date.getMonth() && holiday.getDate() === date.getDate()
  );
}
```

To highlight a specific date in custom colors, you can use the customTextColor and customBackgroundColor properties of the nmDate object to set custom colors.

```ts
public datesHighlightCustomFn: (date: Date, nmDateObject: NmDateInterface) => boolean = (
    date: Date,
    nmDateObject: NmDateInterface
  ) => {
    const isHoliday = !!this.holidays.find(
      (holiday) => holiday.getMonth() === date.getMonth() && holiday.getDate() === date.getDate()
    );
    if (isHoliday) {
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
    return isHoliday;
  };
```

**_Result:_**
<img src="./projects/shared/assets/highlighted_dates.png" alt="Date highlighter demo"/>


#### nmMinDate {#nmMinDate}

`nmMinDate: Date | null`
Used to set the lower limit of available, selectable dates.
Any date earlier than nmMinDate will be either disabled or not displayed at all (depends on the operation mode)

#### nmMaxDate {#nmMaxDate}

`nmMaxDate: Date | null`
Used to set the upper limit of available, selectable dates.
Any date later than nmMaxDate will be either disabled or not displayed at all (depends on the operation mode)


#### nmRangeSelection {#nmRangeSelection}

`nmRangeSelection: boolean`
A boolean value that activates the range selection mode.
\* **The component will output an array of 2 Dates, startDate and endDate**. So you should bind to a [Date, Date] | null, if you are using nmRangeSelection.
\* Available for all 3 operation modes.
\* Not compatible with [nmMultiDateSelect](#nmMultiDateSelect).
False - by default

<img src="./projects/shared/assets/range_mode.png" alt="Range selection mode demo." />

#### nmMultiDateSelect {#nmMultiDateSelect}

`nmMultiDateSelect: boolean`
Activates the multi day selection mode, where you will be able to select multiple dates.
\* **The component will output an array of Dates**. So you should bind to a Date[ ] | null, if you are using nmMultiDateSelect.
\* Works with all 3 operation modes.
\* Not compatible with [nmRangeSelection](#nmRangeSelection).
False - by default

<img src="./projects/shared/assets/multi_mode.png" alt="Multi-date selection mode demo." />


#### nmStatus {#nmStatus}

`nmStatus: 'default' | 'warning' | 'error'`
Used to pass in the date picker status.
\* Works for all 3 operation modes and 2 display methods + in range and multi-date selection modes.

<img src="./projects/shared/assets/dropdown_warning.png" alt="Date picker valid status demo"/>
<img src="./projects/shared/assets/dropdown_warning_1.png" alt="Date picker valid status demo"/>
<img src="./projects/shared/assets/dropdown_error.png" alt="Date picker valid status demo"/>
<img src="./projects/shared/assets/dropdown_error_1.png" alt="Date picker valid status demo"/>


#### nmSelectorCustomLabel {#nmSelectorCustomLabel}

`nmSelectorCustomLabel: string | null`
Used to set a custom label for the picker selector in the 'dropdown' display mode.
By default the value is null, and the word 'Date' (in the specified locale) will be displayed.
<img src="./projects/shared/assets/custom_label.png" alt="Selector custom label demo"/>


#### nmSelectorDateFormat {#nmSelectorDateFormat}

`nmSelectorDateFormat: string | null`
Pass the date format, that you want the selected date to be displayed in, in the default date picker selector.
Default value = null. Results in: date + month name in the set locale, + year


#### nmAllowClear {#nmAllowClear}

`nmAllowClear: boolean`
A boolean value that makes the clear icon available on the default date picker selector in the 'dropdown' display mode.
Disable if the picker needs to be non-nulluble.
By default is set to true


#### nmDropdownPosition {#nmDropdownPosition}
`nmDropdownPosition: 'top' | 'bottom' | undefined`
Explicitly sets the dropdown position of the picker in display mode 'dropdown'.
By default the value is undefined, and the picker determines the position automatically.

### Custom templates {#custom-templates}

nmDatePicker is fully customizable. The idea is to have a date picker component that can be customized under any design, while keeping the usual and much needed date picker functionality. With the modular design you can choose to customize only s single section of the date picker, or all of it.
Custom templates are passed into the component using Angular’s content projection.
nmDatePicker is made up of 6 sections. To customize any of them you need to: 
1. Insert an `<ng-template>` tag between the opening(`<nm-date-picker>`) and closing(`</nm-date-picker>`) tags,
2. Set the corresponding template reference, so that the component can recognize which section of the component the template is meant to replace,
3. Use the template’s implicit variable to access the data, that the component will forward to the template, and construct a custom template. (you can name the variable anything you like)

```html
  <nm-date-picker class="custom-date-picker" [(ngModel)]="date">
    <ng-template #nmCustomDayCellTpl let-day>
      {{ day.date }}
      .... your custom layout and styles
    </ng-template> 
  </nm-date-picker>
```

Examples of all customizable 6 sections will be viewed in detail with code examples. The **_combined_** result will be displayed at the [end of the section](#custom-section-end).

#### nmCustomDayCellTpl

Customizes the day cell in operation mode ‘date’. The template will be used inside of a loop, so on each step of the loop it will receive the [nmDate](#nmDateInterface) object of the cell. 

\* You should take a look at the [nmDate](#nmDateInterface) interface first, to learn about the possible options to apply custom css classes appropriately.

\* If the hight of the cell = 0, (applying 'display:none' in the example with 'other-month' class) the component will assume that the section is hidden and will remove the click event listener from the parent, to prevent action handling when the user clicks the empty cell.  

```html
  <ng-template #nmCustomDayCellTpl let-day>
    <div
      class="custom-day"
      [class.other-month]="day.isNextMarker || day.isPrevMarker"
      [class.selected]="day.isSelected"
      [class.today]="day.isToday"
    >
      <span>{{ day.date | date : "d" }}</span>
    </div>
  </ng-template>
```
```scss
  .custom-date-picker {
    --nm-datepicker-primary-color: #e91d62;
  }
   .custom-day {
    width: 31px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .other-month {
    display: none;
  }

  .today {
    border: 1px solid var(--nm-datepicker-primary-color);
  }

  .selected {
    background-color: var(--nm-datepicker-primary-color);
    color: white;
  }

  .custom-week {
    font-size: 12px;
  }

  .custom-month,
  .custom-year {
    border-radius: 4px;
    width: 70px;
    height: 25px;
    margin: 13px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-month__selected,
  .custom-year__selected {
    background-color: var(--nm-datepicker-primary-color);
    color: white;
  }

  .custom-selector {
    background-color: var(--nm-datepicker-primary-color);
    border-radius: 8px;
    color: white;
    padding: 12px 20px;
    width: 239px;
    .year {
      font-size: 16px;
    }
    .date {
      margin-top: 4px;
      font-size: 24px;
    }
  }

  .custom-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .arrow-btn {
      background-color: transparent;
      border: none;
      outline: none;
      margin: 0;
      padding: 0;
      &:hover {
        svg {
          fill: var(--nm-datepicker-primary-color);
        }
      }
      svg {
        width: 30px;
        height: 30px;
      }
    }

    .text-btn {
      font-size: 14px;
      border: none;
      outline: none;
      padding: 0;
      &:hover {
        color: var(--nm-datepicker-primary-color);
      }
    }
  }
```

#### nmCustomWeekCellTpl

Customizes the weekday cell in operation mode ‘date’. The template will be used inside of a loop, so on each step of the loop it will receive the [NmWeekday](#nmWeekdayInterface) object of the cell. 

\* You should take a look at the [NmWeekday](#nmWeekdayInterface) interface first, to learn about the possible options to apply custom css classes appropriately.

```html
  <ng-template #nmCustomWeekCellTpl let-week>
    <div class="custom-week">
      <span>{{ week.name[0] }}</span>
    </div>
  </ng-template>
```

#### nmCustomMonthCellTpl

Customizes the month cell in operation mode ‘month’. The template will be used inside of a loop, so on each step of the loop it will receive the [nmDate](#nmDateInterface) object of the cell. 

```html
  <ng-template #nmCustomMonthCellTpl let-month>
    <div class="custom-month" [class.custom-month__selected]="month.isSelected">
      {{ month.monthName }}
    </div>
  </ng-template>
```

#### nmCustomYearCellTpl

Customizes the year cell in operation mode ‘year’. The template will be used inside of a loop, so on each step of the loop it will receive the [nmDate](#nmDateInterface) object of the cell. 

```html
  <ng-template #nmCustomYearCellTpl let-year>
    <div class="custom-year" [class.custom-year__selected]="year.isSelected">
      {{ year.date | date : "YYYY" }}
    </div>
  </ng-template>
```

#### nmCustomHeaderTpl

Customizes the header of the date picker. The template receives an object of [NmHeaderActionsGroup](#nmHeaderActionsGroup) interface. Includes the 4 actions used in the header. 

```html
  <ng-template #nmCustomHeaderTpl let-nmHeaderActions>
    <div class="custom-header" *ngIf="nmHeaderActions">
      <button
        class="arrow-btn"
        [disabled]="nmHeaderActions.prevAction.disabled"
        (click)="nmHeaderActions.prevAction.onClick()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="chevron-left-arrow">
          <g data-name="16">
            <rect width="24" height="24" fill="none"></rect>
            <path
              d="M14.16,14.72a.75.75,0,0,1,0,1.06.76.76,0,0,1-1.07,0L9.84,12.53a.75.75,0,0,1,0-1.06l3.25-3.25a.77.77,0,0,1,1.07,0,.75.75,0,0,1,0,1.06L11.44,12Z"
            ></path>
          </g>
        </svg>
      </button>
      <div class="date">
        <button
          class="text-btn"
          [disabled]="nmHeaderActions.monthAction.disabled"
          (click)="nmHeaderActions.monthAction.onClick()"
        >
          {{ nmHeaderActions.monthAction.pickerDisplayDate | date : "MMMM" }}&nbsp;</button
        >&nbsp;
        <button
          class="text-btn"
          [disabled]="nmHeaderActions.yearAction.disabled"
          (click)="nmHeaderActions.yearAction.onClick()"
        >
          {{ nmHeaderActions.yearAction.pickerDisplayDate | date : "YYYY" }}
        </button>
      </div>
      <button
        class="arrow-btn"
        [disabled]="nmHeaderActions.nextAction.disabled"
        (click)="nmHeaderActions.nextAction.onClick()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="chevron-right-arrow">
          <g data-name="17">
            <rect width="24" height="24" fill="none" transform="rotate(180 12 12)"></rect>
            <path
              d="M9.84,14.72A.75.75,0,0,0,10.38,16a.74.74,0,0,0,.53-.22l3.25-3.25a.75.75,0,0,0,0-1.06L10.91,8.22a.77.77,0,0,0-1.07,0,.75.75,0,0,0,0,1.06L12.56,12Z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  </ng-template>
```

#### nmCustomSelectorTpl

Customizes the selector of the date picker in 'dropdown' display mode. The template receives the selected date. Depending on the picker (default | range selector | multi-date selector) the interface of the date will vary. 
* default: `Date | null`
* range selector: `[Date | null, Date | null]`
* multi-date selector: `Date[]`

```html
  <ng-template #nmCustomSelectorTpl let-selectorDate>
    <div class="custom-selector">
      <div class="year">{{ selectorDate | date : "YYYY" }}</div>
      <div class="date">{{ selectorDate | date : "MMMM dd" }}</div>
    </div>
  </ng-template>
```

#### Result: {#custom-section-end} 

<img src="./projects/shared/assets/custom_demo.png" alt="Custom templates demo"/>

### Interfaces {#interfaces}

#### NmDateInterface {#nmDateInterface}

```ts
interface NmDateInterface {
  date: Date; // date value of the cell
  isPrevMarker: boolean; // is true if the date belongs in the previous month (works for 'year' mode as well)
  isNextMarker: boolean; // is true if the date belongs in the next month
  disabled: boolean; // true when the date is disabled
  isToday: boolean; // true if the date value equals to today's
  isSelected: boolean; // true when the date is selected
  isWeekend: boolean; // true when the date is a weekend
  isHighlighted: boolean; // true when highlighted
  monthName?: string; // the name of the month cell. Used during operation mode 'month' 
  customTextColor: string | undefined; // custom text color of the cell
  customBackgroundColor: string | undefined; // custom background color of the cell
}
```

#### NmWeekdayInterface {#nmWeekdayInterface}

```ts
interface NmWeekdayInterface {
  name: string; // the name of the weekday
  index: number; // the 0 based index of the weekday
  isWeekend: boolean; // bolean value that indicates if a weekday is a weekend
}
```

#### NmHeaderActionsGroup {#nmHeaderActionsGroup}

```ts
interface NmHeaderActionsGroup {
  nextAction: NmHeaderAction; // arrow action right
  prevAction: NmHeaderAction; // arrow action left
  monthAction: NmHeaderAction; // switch to months action
  yearAction: NmHeaderAction; // switch to years action
}

interface NmHeaderAction {
  pickerDisplayDate: Date; // the date of the current view. Used to set the value of the current month/year
  disabled: boolean; // disabled attribute of the action
  onClick: () => void; // the callback function executed by the action.
  clickObserver$: ReplaySubject<number>; // A subject that is triggered on click
}
```

### Services {#services}

#### Action notifier service {#action-notifier-service}

If you need to follow certain actions in the date picker, you can access the publicly available NmActionNotifierService.

\* Each instance of the nm-date-picker has its own NmActionNotifierService. So first you need to access the date picker you need. 

```html
  <nm-date-picker #customNmDatePicker></nm-date-picker>
```

```ts
  @ViewChild("customNmDatePicker") customNmDatePicker!: NmDatePickerComponent;

  ngAfterViewInit(): void {
    this.customNmDatePicker.nmActionNotifierService.nmDropdownOpenEvent$.subscribe(() => console.log('open'));
    this.customNmDatePicker.nmActionNotifierService.nmDropdownCloseEvent$.subscribe(() => console.log('close'));
    this.customNmDatePicker.nmActionNotifierService.nmNextActionTriggered$.subscribe(() => console.log('next'));
    this.customNmDatePicker.nmActionNotifierService.nmPrevActionTriggered$.subscribe(() => console.log('prev'));
    this.customNmDatePicker.nmActionNotifierService.nmPickerCurrentMode$.subscribe((mode) => console.log('Mode: ' + mode));
    this.customNmDatePicker.nmActionNotifierService.nmClearActionTriggered$.subscribe(() => console.log('clear'));
  }
``` 

### Licence {#license}

<a href="https://github.com/NarekMkhoyan/Project_NM-DP/blob/main/LICENSE" target="_blank">MIT</a>
