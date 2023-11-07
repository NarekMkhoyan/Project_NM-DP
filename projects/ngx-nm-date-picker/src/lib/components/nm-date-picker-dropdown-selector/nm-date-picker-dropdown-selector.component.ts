import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Observable, combineLatest, map, takeUntil } from "rxjs";
import { NM_FALLBACK_LANGUAGE, NM_SELECTOR_LABEL_LOCALIZATION } from "../../constants/localization.constant";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";
import { NM_SELECTOR_STATES } from "../../constants/selector-states.enum";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";
import { NM_VALID_STATUS } from "../../constants/valid-status.enum";
import { Unsubscribe } from "../unsubscribe/unsubscribe.component";
import { NmLanguageType } from "../../interfaces/language.type";
import { labelSlideUpAnimation } from "../../utils/animations";

@Component({
  selector: "nm-date-picker-dropdown-selector",
  templateUrl: "./nm-date-picker-dropdown-selector.component.html",
  styleUrls: ["./nm-date-picker-dropdown-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [labelSlideUpAnimation],
})
export class NmDatePickerDropdownSelectorComponent extends Unsubscribe implements OnInit {
  @Input() selectorDateFormat: string | null = null;
  @Input() selectorCustomLabel: string | null = null;

  public SELECTOR_STATES = NM_SELECTOR_STATES;
  public selectedDate: Date | null = null;
  public language: NmLanguageType = NM_FALLBACK_LANGUAGE;
  public defaultSelectorLabel: string = NM_SELECTOR_LABEL_LOCALIZATION[NM_FALLBACK_LANGUAGE];
  private monthNames = this.stateService.localization[NM_FALLBACK_LANGUAGE].MONTH_NAMES_DECLENSED;

  public get selectorState$(): Observable<NM_SELECTOR_STATES> {
    return this.stateService.dropdownSelectorState$;
  }

  public get pickerModeLimitedBy(): NmDatePickerModeType {
    return this.stateService.pickerModeLimitedBy;
  }

  public get rangeModeActive(): boolean {
    return this.stateService.rangeSelectionActive;
  }

  public get multiModeActive(): boolean {
    return this.stateService.nmMultiDateSelect;
  }

  public get dateRange(): [Date | null, Date | null] {
    return this.stateService.selectedDateRange;
  }

  public get dateArray(): Date[] {
    return this.stateService.selectedDatesArray;
  }

  public get allowClear(): boolean {
    return this.stateService.nmAllowClear;
  }

  public get nmStatus$(): Observable<NM_VALID_STATUS> {
    return this.stateService.nmStatus$;
  }

  public get clearIconVisible(): boolean {
    if (this.stateService.rangeSelectionActive) {
      const [start, end] = this.stateService.selectedDateRange;
      return start !== null && end !== null;
    } else if (this.stateService.nmMultiDateSelect) {
      return this.stateService.selectedDatesArray.length > 0;
    } else {
      return this.selectedDate !== null;
    }
  }

  constructor(private readonly stateService: NmDatePickerStateService, private readonly cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.stateService.updatePicker$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.selectedDate = this.stateService.selectedDate
        ? new Date(this.stateService.selectedDate)
        : this.stateService.selectedDate;
      this.cdr.markForCheck();
    });
    combineLatest([this.stateService.updatePicker$, this.stateService.currentLanguage$])
      .pipe(
        takeUntil(this.unsubscribe$),
        map(([, currentLanguage]) => {
          this.monthNames = this.stateService.localization[currentLanguage]
            ? this.stateService.localization[currentLanguage].MONTH_NAMES_DECLENSED
            : this.stateService.localization[NM_FALLBACK_LANGUAGE].MONTH_NAMES_DECLENSED;
          this.defaultSelectorLabel = NM_SELECTOR_LABEL_LOCALIZATION.hasOwnProperty(currentLanguage)
            ? NM_SELECTOR_LABEL_LOCALIZATION[currentLanguage as NmLanguageType]
            : NM_SELECTOR_LABEL_LOCALIZATION[NM_FALLBACK_LANGUAGE as NmLanguageType];
          this.language = currentLanguage;
        })
      )
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  public clearPickerValue(): void {
    this.stateService.selectedDate = null;
    this.stateService.selectedDateRange = [null, null];
    this.stateService.selectedDatesArray = [];
    this.stateService.updatePicker$.next();
    this.stateService.emitSelectedDate$.next();
  }

  public getMonthName(date: Date | null): string {
    return date ? this.monthNames[date.getMonth()] : "";
  }
}
