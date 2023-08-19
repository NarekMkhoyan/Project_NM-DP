import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs";
import { boxShadowDropAnimation, fadeInDownwardsAnimation, fadeInUpwardsAnimation } from "../../utils/animations";
import { NmDatePickerHeaderService } from "../../services/header/nm-date-picker-header.service";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";
import { NmDatePickerMonthModeService } from "../../services/month-mode/month-mode.service";
import { NmDatePickerDisplayMethodType } from "../../interfaces/picker-display-method.type";
import { NmDatePickerSelectorStateType } from "../../interfaces/selector-states.type";
import { NmHolidaysDisplayType } from "../../interfaces/holiday-display.type";
import { YearModeService } from "../../services/year-mode/year-mode.service";
import { DateModeService } from "../../services/date-mode/date-mode.service";
import { NM_SELECTOR_STATES } from "../../constants/selector-states.enum";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";
import { NmLocalizationType } from "../../interfaces/localization.type";
import { Unsubscribe } from "../unsubscribe/unsubscribe.component";
import { NmLanguageType } from "../../interfaces/language.type";

@Component({
  selector: "nm-date-picker",
  templateUrl: "./nm-date-picker.html",
  styleUrls: ["./nm-date-picker.scss"],
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
    YearModeService,
    DateModeService,
  ],
})
export class NmDatePickerComponent extends Unsubscribe implements ControlValueAccessor, OnInit {
  public SELECTOR_STATES = NM_SELECTOR_STATES;
  /**
   * weekendDisplayMethod: string
   *
   * Specify the method for displaying weekends(Saturdays and Sundays) on the calendar.
   *
   *  start - the days of the week start with Saturday, Sunday ...
   *
   *  end - the days of the week end with ... Saturday, Sunday
   *
   *  split - the week start with Sunday ... ends with Saturday
   *
   * Default value = 'end'.
   */
  @Input() nmWeekendDisplayMethod: NmHolidaysDisplayType = "end";

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
   * nmMarkWeekends: boolean
   *
   * Whether to mark the weekends in red (by default) or not.
   *
   * Default value = false.
   */
  @Input() nmMarkWeekends: boolean = false;

  // TODO: test a custom selector. Maybe delay until v3 with custom templates
  @Input() nmCustomSelectorTpl: TemplateRef<any> | null = null;

  /**
   * nmSelectorDateFormat: string | null
   *
   * Pass the date format, that you want the selected date to be displayed in the default date picker selector
   *
   * Default value = null. Results in date + month name in the set locale, + year
   */
  @Input() nmSelectorDateFormat: string | null = null;

  @Input() set nmCustomLocalization(value: NmLocalizationType) {
    this.stateService.localization = { ...this.stateService.localization, ...value };
  }

  @Input() set pickerMode(value: NmDatePickerModeType) {
    this.stateService.pickerMode$.next(value);
    this.stateService.pickerModeLimitedBy = value;
  }

  @Input() set disabledDates(value: (date: Date) => boolean) {
    this.stateService.disabledDateFunctionAvailable = true;
    this.stateService.disabledDateFunction = value;
  }

  @Input() set nmDisplayMethod(value: NmDatePickerDisplayMethodType) {
    this.stateService.pickerDisplayMethod = value;
  }

  @Input() nmDisabled: boolean = false;

  @Input() nmSelectorCustomLabel: string | null = null;

  public get nmDisplayMethod(): NmDatePickerDisplayMethodType {
    return this.stateService.pickerDisplayMethod;
  }

  public get selectorState$(): Observable<NmDatePickerSelectorStateType> {
    return this.stateService.dropdownSelectorState$;
  }

  constructor(
    private readonly yearModeService: YearModeService,
    private readonly stateService: NmDatePickerStateService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.stateService.emitSelectedDate$.pipe().subscribe(() => {
      this.onChange(this.stateService.selectedDate);
    });
  }

  // ControlValueAccessor functions
  public writeValue(date: Date | null): void {
    this.stateService.selectedDate = date ? new Date(date) : date;
    this.stateService.displayDate = date ? new Date(date) : new Date();
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

  private onChange: any = (value: any) => {};

  private onTouch: any = () => {};
}
