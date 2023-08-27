import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, ReplaySubject } from "rxjs";
import { NmDatePickerDisplayMethodType } from "../../interfaces/picker-display-method.type";
import { NmDatePickerSelectorStateType } from "../../interfaces/selector-states.type";
import { NM_FALLBACK_LANGUAGE } from "../../constants/localization.constant";
import { NM_SELECTOR_STATES } from "../../constants/selector-states.enum";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";
import { NmLocalizationType } from "../../interfaces/localization.type";
import { NM_LOCALIZATION } from "../../constants/localization.constant";
import { NmLanguageType } from "../../interfaces/language.type";

@Injectable()
export class NmDatePickerStateService {
  /** The currently selected date value */
  public selectedDate: Date | null = null;
  /** The date that is used for generating needed dates. */
  public displayDate: Date = new Date();
  /** Subject trigger that notifies the component to update the view, i.e. when changing month, year */
  public updatePicker$: ReplaySubject<void> = new ReplaySubject<void>(1);
  /** Subject trigger that notifies when the value needs to be emitted out */
  public emitSelectedDate$: Subject<void> = new Subject<void>();
  /** Follows the picker body width to adjust the header width accordingly */
  public pickerBodyWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  /** Picker mode that currently is applied - 'date' | 'month' | 'year' */
  public pickerMode$: BehaviorSubject<NmDatePickerModeType> = new BehaviorSubject<NmDatePickerModeType>("date");
  /** The mode the picker is limited to. Set by the pickerMode property*/
  public pickerModeLimitedBy: NmDatePickerModeType = "date";
  /** Marks the nearest decade threshold. Used by the year-mode component and the header. */
  public decadeMarkingYear!: number;
  /** The current state of the date picker selector(*in dropdown mode) */
  public dropdownSelectorState$: BehaviorSubject<NmDatePickerSelectorStateType> =
    new BehaviorSubject<NmDatePickerSelectorStateType>(NM_SELECTOR_STATES.INITIAL);

  public pickerDisplayMethod: NmDatePickerDisplayMethodType = "dropdown";

  public localization: NmLocalizationType = NM_LOCALIZATION;

  public currentLanguage$: BehaviorSubject<NmLanguageType> = new BehaviorSubject<NmLanguageType>(NM_FALLBACK_LANGUAGE);

  public swipeLeftTrigger$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public swipeRightTrigger$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public disabledDateFunctionAvailable: boolean = false;
  public disabledDateFunction!: (date: Date) => boolean;
}
