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
import { HeaderAction } from "../../interfaces/header-action.interface";

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
  /** Picker mode that currently is applied - 'date' | 'month' | 'year' */
  public pickerMode$: BehaviorSubject<NmDatePickerModeType> = new BehaviorSubject<NmDatePickerModeType>("date");
  /** The mode the picker is limited to. Set by the pickerMode property*/
  public pickerModeLimitedBy: NmDatePickerModeType = "date";
  /** Marks the nearest decade threshold. Used by the year-mode component and the header. */
  public decadeMarkingYear!: number;
  /** The current display method of the picker. Dropdown or inline */
  public pickerDisplayMethod: NmDatePickerDisplayMethodType = "dropdown";
  /** The current state of the date picker selector(*in dropdown mode) */
  public dropdownSelectorState$: BehaviorSubject<NmDatePickerSelectorStateType> =
    new BehaviorSubject<NmDatePickerSelectorStateType>(NM_SELECTOR_STATES.INITIAL);
  /** The function that checks, if a day is disabled. Passed in by the user. Defaults to null */
  public disabledDateFunction: null | ((date: Date) => boolean) = null;

  /** The localization object that holds the default 3 languages and any additional translations */
  public localization: NmLocalizationType = NM_LOCALIZATION;
  /** The current language subject. */
  public currentLanguage$: BehaviorSubject<NmLanguageType> = new BehaviorSubject<NmLanguageType>(NM_FALLBACK_LANGUAGE);

  /** Follows the picker body width to adjust the header width accordingly */
  public pickerBodyWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /** The minimum date that the pickers supports (set by the user). */
  public nmMinDate: Date | null = null;
  /** The maximum date that the pickers supports (set by the user). */
  public nmMaxDate: Date | null = null;

  private _headerActions: HeaderAction[] = [];

  public set headerActions(actions: HeaderAction[]) {
    this._headerActions = actions;
  }

  public get headerActions(): HeaderAction[] {
    return this._headerActions;
  }
}
