import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, takeUntil } from "rxjs";
import { boxShadowDropAnimation, fadeInDownwardsAnimation, fadeInUpwardsAnimation } from "../../utils/animations";
import { NmActionNotifierService } from "../../services/action-notifier/action-notifier.service";
import { NmDatePickerHeaderService } from "../../services/header/nm-date-picker-header.service";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";
import { NmDatePickerMonthModeService } from "../../services/month-mode/month-mode.service";
import { NmDatePickerDisplayMethodType } from "../../interfaces/picker-display-method.type";
import { NM_VALID_STATUS, NmSelectorStatusType } from "../../constants/valid-status.enum";
import { NmHolidaysDisplayType } from "../../interfaces/holiday-display.type";
import { YearModeService } from "../../services/year-mode/year-mode.service";
import { DateModeService } from "../../services/date-mode/date-mode.service";
import { NM_SELECTOR_STATES } from "../../constants/selector-states.enum";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";
import { NmLocalizationType } from "../../interfaces/localization.type";
import { Unsubscribe } from "../unsubscribe/unsubscribe.component";
import { NmDateInterface } from "../../interfaces/date.interface";
import { NmLanguageType } from "../../interfaces/language.type";

@Component({
  selector: "nm-date-picker",
  templateUrl: "./nm-date-picker.html",
  styleUrls: ["./nm-date-picker.scss", "./_variables.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInDownwardsAnimation, fadeInUpwardsAnimation, boxShadowDropAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NmDatePickerComponent,
    },
    NmDatePickerMonthModeService,
    NmDatePickerHeaderService,
    NmDatePickerStateService,
    NmActionNotifierService,
    YearModeService,
    DateModeService,
  ],
})
export class NmDatePickerComponent extends Unsubscribe implements ControlValueAccessor, OnInit {
  public readonly SELECTOR_STATES = NM_SELECTOR_STATES;
  /**
   * nmWeekendDisplayMethod: string
   *
   * Specify the method for displaying weekends(Saturdays and Sundays) on the calendar.
   *
   *  start - the week starts with Saturday, Sunday ...
   *
   *  end - the week ends with ... Saturday, Sunday
   *
   *  split - the week starts with Sunday ... ends with Saturday
   *
   * Default value = 'end'.
   */
  @Input() nmWeekendDisplayMethod: NmHolidaysDisplayType = "end";

  /**
   * nmMarkWeekends: boolean
   *
   * Whether to mark the weekends in red (by default) or not.
   *
   * Default value = false.
   */
  @Input() nmMarkWeekends: boolean = false;

  /**
   * nmLanguage: NmLanguageType
   *
   * Sets the current language used by the picker.
   *
   * Either pass one of the supported language keys - 'en' | 'ru' | 'am',
   *
   * or you can pass any key that you have used in "nmCustomLocalization".
   *
   * Default value = 'en'.
   */
  @Input() set nmLanguage(value: NmLanguageType) {
    this.stateService.currentLanguage$.next(value);
  }

  /**
   * nmSelectorDateFormat: string | null
   *
   * Pass the date format, that you want the selected date to be displayed in, in the default date picker selector
   *
   * Default value = null. Results in: date + month name in the set locale, + year
   */
  @Input() nmSelectorDateFormat: string | null = null;

  /**
   * nmCustomLocalization: NmLocalizationType
   *
   * Pass in a custom localization object following the NmLocalizationType type
   *
   * * WEEKDAY_NAMES_SHORT used for the weekday names in 'date' mode
   * * MONTH_NAMES_SHORT used for month names in 'month' mode
   * * MONTH_NAMES used for displaying the selected month name in the date picker selector (display method 'dropdown')
   */
  @Input() set nmCustomLocalization(value: NmLocalizationType) {
    this.stateService.localization = { ...this.stateService.localization, ...value };
  }

  /**
   * nmPickerMode: 'date' | 'month' | 'year'
   *
   * Pass in the date picker operation mode
   */
  @Input() set nmPickerMode(value: NmDatePickerModeType) {
    this.stateService.pickerMode$.next(value);
    this.stateService.pickerModeLimitedBy = value;
  }

  /**
   * nmDisabledDates: (date: Date) => boolean
   *
   * Accepts a callback function, that is applied to every date cell in the view
   *
   * Receives the Date object of the cell, and must return a boolean value based on the evaluation that determines whether the cell is disabled or not
   *
   * @example
    (date: Date) => {
        return date.getTime() < this.minDateValue || date.getTime() > this.maxDateValue;
    };
   */
  @Input() set nmDisabledDates(value: (date: Date) => boolean) {
    this.stateService.disabledDateFunction = value;
  }

  /**
   * nmHighlightedDates: (date: Date, nmDateObject: NmDateInterface) => boolean)
   *
   * Accepts a callback function, that is applied to every date cell in the view
   *
   * Receives the Date object of the cell and the nmDateObject class, and must return a boolean value based on the evaluation that determines whether the cell should be highlighted or not
   *
   * \* To highlight a specific date in custom colors, you can use the customTextColor and customBackgroundColor properties from the nmDateObject to set custom colors
   */
  @Input() set nmHighlightedDates(value: (date: Date, nmDateObject: NmDateInterface) => boolean) {
    this.stateService.highlightedDatesFunction = value;
  }

  /**
   * nmDisplayMethod: 'inline' | 'dropdown'
   *
   * Select one of the 2 supported display methods.
   *
   * By default it is set to 'dropdown'
   */
  @Input() set nmDisplayMethod(value: NmDatePickerDisplayMethodType) {
    this.stateService.pickerDisplayMethod = value;
  }

  /**
   * nmDisabled: boolean
   *
   * A boolean value that sets the disabled state of the whole picker
   */
  @Input() nmDisabled: boolean = false;

  /**
   * nmSelectorCustomLabel: string | null
   *
   * Is used to set a custom label for the picker selector in the 'dropdown' display mode
   *
   * By default the value is null. And the word 'Date'(in the specified locale) will be used
   */
  @Input() nmSelectorCustomLabel: string | null = null;

  /**
   * nmMinDate: Date | null
   *
   * Used to set the lower limit of valid, selectable dates
   *
   * Any date earlier than nmMinDate will be either disabled or not displayed at all(depends on the operation mode)
   */
  @Input() set nmMinDate(value: Date | null) {
    this.stateService.nmMinDate = value;
    if (value) {
      const oldFn = this.stateService.disabledDateFunction;
      const newCheckerFn = (date: Date) => {
        return (!!oldFn && oldFn(date)) || value.getTime() > date.getTime();
      };
      this.stateService.disabledDateFunction = newCheckerFn;
    }
  }

  /**
   * nmMinDate: Date | null
   *
   * Used to set the upper limit of valid, selectable dates
   *
   * Any date later than nmMaxDate will be either disabled or not displayed at all(depends on the operation mode)
   */
  @Input() set nmMaxDate(value: Date | null) {
    this.stateService.nmMaxDate = value;
    if (value) {
      const oldFn = this.stateService.disabledDateFunction;
      const newCheckerFn = (date: Date) => {
        return (!!oldFn && oldFn(date)) || value.getTime() < date.getTime();
      };
      this.stateService.disabledDateFunction = newCheckerFn;
    }
  }

  /**
   * nmRangeSelection: boolean
   *
   * A boolean value that activates the range selection mode
   *
   * \* Available for all 3 operation modes.
   *
   * \* Not compatible with nmMultiDateSelect.
   *
   * False - by default
   */
  @Input() set nmRangeSelection(activeState: boolean) {
    this.stateService.rangeSelectionActive = activeState;
    this.stateService.nmMultiDateSelect = false;
  }

  /**
   * nmAllowClear: boolean
   *
   * A boolean value that makes the clear icon available on the default date picker selector in the 'dropdown' display mode
   *
   * By default is set to true
   */
  @Input() set nmAllowClear(clearIconVisible: boolean) {
    this.stateService.nmAllowClear = clearIconVisible;
  }

  /**
   * nmStatus: 'default' | 'warning' | 'error'
   *
   * Pass in the date picker status based on a validation
   *
   * \* Works for all 3 operation mode and 2 display methods + in range selection mode
   */
  @Input() set nmStatus(status: NmSelectorStatusType) {
    this.stateService.nmStatus$.next(NM_VALID_STATUS[status]);
  }

  /**
   * nmMultiDateSelect: boolean
   *
   * Activates the multi day selection mode, where you will be able to select multiple dates.
   *
   * The component will output an array of Dates.
   *
   * \* Works with all 3 operation modes.
   *
   * \* Not compatible with nmRangeSelection.
   *
   * False - by default
   */
  @Input() set nmMultiDateSelect(value: boolean) {
    this.stateService.nmMultiDateSelect = value;
    this.stateService.rangeSelectionActive = false;
  }

  @ContentChild("nmCustomDayCellTpl") set customDayCellTpl(value: TemplateRef<any> | undefined) {
    this.stateService.customDayCellTpl = value;
  }

  @ContentChild("nmCustomWeekCellTpl") set customWeekCellTpl(value: TemplateRef<any> | undefined) {
    this.stateService.customWeekCellTpl = value;
  }

  @ContentChild("nmCustomMonthCellTpl") set customMonthCellTpl(value: TemplateRef<any> | undefined) {
    this.stateService.customMonthCellTpl = value;
  }

  @ContentChild("nmCustomYearCellTpl") set customYearCellTpl(value: TemplateRef<any> | undefined) {
    this.stateService.customYearCellTpl = value;
  }

  @ContentChild("nmCustomHeaderTpl") set customHeaderTpl(value: TemplateRef<any> | undefined) {
    this.stateService.customHeaderTpl = value;
  }

  @ContentChild("nmCustomSelectorTpl") nmCustomSelectorTpl: TemplateRef<any> | undefined;

  public get nmDisplayMethod(): NmDatePickerDisplayMethodType {
    return this.stateService.pickerDisplayMethod;
  }

  public get selectorState$(): Observable<NM_SELECTOR_STATES> {
    return this.stateService.dropdownSelectorState$;
  }

  public get nmPickerMode$(): Observable<NmDatePickerModeType> {
    return this.stateService.pickerMode$;
  }

  public get selectedDate(): Date | [Date | null, Date | null] | Date[] | null {
    return this.stateService.selectedDate;
  }

  constructor(
    public readonly nmActionNotifierService: NmActionNotifierService,
    private readonly yearModeService: YearModeService,
    private readonly stateService: NmDatePickerStateService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.stateService.emitSelectedDate$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      if (
        this.stateService.rangeSelectionActive &&
        (!this.stateService.selectedDateRange[0] || !this.stateService.selectedDateRange[1])
      ) {
        return;
      }
      let emitValue: Date | [Date | null, Date | null] | Date[] | null = this.stateService.selectedDate;
      if (this.stateService.rangeSelectionActive) emitValue = this.stateService.selectedDateRange;
      if (this.stateService.nmMultiDateSelect) emitValue = this.stateService.selectedDatesArray;
      this.onChange(emitValue);
      this.onTouch();
    });

    this.stateService.dropdownSelectorState$.pipe(takeUntil(this.unsubscribe$)).subscribe((selectorState) => {
      switch (selectorState) {
        case NM_SELECTOR_STATES.INITIAL:
          break;
        case NM_SELECTOR_STATES.ACTIVE:
          this.nmActionNotifierService.nmDropdownOpenEvent$.next();
          break;
        case NM_SELECTOR_STATES.INACTIVE:
          this.nmActionNotifierService.nmDropdownCloseEvent$.next();
          this.onTouch();
          break;
      }
    });

    this.stateService.pickerMode$.pipe(takeUntil(this.unsubscribe$)).subscribe((currentPickerMode) => {
      this.nmActionNotifierService.nmPickerCurrentMode$.next(currentPickerMode);
    });
    this.stateService.updatePicker$.next();
  }

  // ControlValueAccessor functions
  public writeValue(dateValue: Date | [Date | null, Date | null] | Date[] | null): void {
    this.processWriteValueDate(dateValue);
    this.yearModeService.setDecadeMarker();
    this.stateService.updatePicker$.next();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}

  private onChange: (value: Date | [Date | null, Date | null] | Date[] | null) => void = (
    value: Date | [Date | null, Date | null] | Date[] | null
  ) => {};

  private onTouch: any = () => {};

  private processWriteValueDate(date: Date | [Date | null, Date | null] | Date[] | null): void {
    let newDateValue: Date | [Date | null, Date | null] | Date[] | null = date;
    let displayDate: Date = new Date();
    if (Array.isArray(date)) {
      displayDate = date[0] ? new Date(date[0]) : new Date();
      if (this.stateService.nmMultiDateSelect) {
        newDateValue = [...date];
      } else if (this.stateService.rangeSelectionActive) {
        newDateValue = [date[0] || null, date[1] || null];
      } else {
        newDateValue = date[0];
      }
    } else if (date) {
      displayDate = new Date(date);
      if (this.stateService.nmMultiDateSelect) {
        newDateValue = [date];
      }
      if (this.stateService.rangeSelectionActive) {
        newDateValue = [date, null];
      }
    } else {
      displayDate = new Date();
      if (this.stateService.nmMultiDateSelect) {
        newDateValue = [];
      }
      if (this.stateService.rangeSelectionActive) {
        newDateValue = [null, null];
      }
    }

    if (this.stateService.nmMultiDateSelect)
      newDateValue ? (this.stateService.selectedDatesArray = newDateValue as Date[]) : [];
    if (this.stateService.rangeSelectionActive)
      newDateValue ? (this.stateService.selectedDateRange = newDateValue as [Date | null, Date | null]) : [];
    if (!this.stateService.nmMultiDateSelect && !this.stateService.rangeSelectionActive) {
      this.stateService.selectedDate = newDateValue as Date | null;
    }
    this.stateService.displayDate = displayDate ? new Date(displayDate) : new Date();
  }
}
