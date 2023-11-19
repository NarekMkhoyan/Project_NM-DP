import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from "@angular/core";
import { Observable, combineLatest, map, takeUntil } from "rxjs";
import { NmDatePickerStateService } from "../../../services/state/nm-date-picker-state.service";
import { NmDatePickerMonthModeService } from "../../../services/month-mode/month-mode.service";
import { NM_SELECTOR_STATES } from "../../../constants/selector-states.enum";
import { NM_VALID_STATUS } from "../../../constants/valid-status.enum";
import { Unsubscribe } from "../../unsubscribe/unsubscribe.component";
import { monthRangeSetter } from "../../../utils/dateRangeSetter";
import { NmDate } from "../../../interfaces/date.interface";
import { isSameMonth } from "../../../utils/dateCompare";

@Component({
  selector: "nm-date-picker-month-mode",
  templateUrl: "./nm-date-picker-month-mode.component.html",
  styleUrls: ["./nm-date-picker-month-mode.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NmDatePickerMonthModeComponent extends Unsubscribe implements OnInit {
  public months: NmDate[][] = [];
  private SELECTOR_STATES = NM_SELECTOR_STATES;

  get customMonthCellTpl(): TemplateRef<any> | undefined {
    return this.stateService.customMonthCellTpl;
  }

  get nmStatus$(): Observable<NM_VALID_STATUS> {
    return this.stateService.nmStatus$;
  }

  constructor(
    private readonly monthService: NmDatePickerMonthModeService,
    private readonly stateService: NmDatePickerStateService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.initMonths();
  }

  public setSelectedMonth(selectedMonthValue: Date): void {
    this.stateService.displayDate = new Date(selectedMonthValue);
    if (this.stateService.pickerModeLimitedBy === "month") {
      this.stateService.selectedDate = new Date(selectedMonthValue);
      if (this.stateService.rangeSelectionActive) {
        this.stateService.selectedDateRange = monthRangeSetter(this.stateService.selectedDateRange, selectedMonthValue);
        const [start, end] = this.stateService.selectedDateRange;
        if (start && end) {
          this.stateService.rangeLimits = [null, null];
          this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
        }
      } else if (this.stateService.nmMultiDateSelect) {
        const amongSelected = this.stateService.selectedDatesArray.findIndex((selectedDate) =>
          isSameMonth(selectedDate, selectedMonthValue)
        );
        if (amongSelected >= 0) {
          this.stateService.selectedDatesArray.splice(amongSelected, 1);
        } else {
          this.stateService.selectedDatesArray.push(selectedMonthValue);
        }
        this.stateService.updatePicker$.next();
      } else {
        this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
      }
      this.stateService.emitSelectedDate$.next();
    } else {
      this.stateService.pickerMode$.next("date");
    }
    this.stateService.updatePicker$.next();
  }

  private initMonths(): void {
    combineLatest([this.stateService.updatePicker$, this.stateService.currentLanguage$])
      .pipe(
        takeUntil(this.unsubscribe$),
        map(([, currentLanguage]) => {
          this.months = this.monthService.generateMonths(currentLanguage);
        })
      )
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }
}
