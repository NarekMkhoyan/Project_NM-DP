import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from "@angular/core";
import { Observable, takeUntil } from "rxjs";
import { NmDatePickerStateService } from "../../../services/state/nm-date-picker-state.service";
import { YearModeService } from "../../../services/year-mode/year-mode.service";
import { NM_SELECTOR_STATES } from "../../../constants/selector-states.enum";
import { NM_VALID_STATUS } from "../../../constants/valid-status.enum";
import { Unsubscribe } from "../../unsubscribe/unsubscribe.component";
import { yearRangeSetter } from "../../../utils/dateRangeSetter";
import { NmDate } from "../../../interfaces/date.interface";
import { isSameYear } from "../../../utils/dateCompare";

@Component({
  selector: "nm-date-picker-year-mode",
  templateUrl: "./nm-date-picker-year-mode.component.html",
  styleUrls: ["./nm-date-picker-year-mode.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NmDatePickerYearModeComponent extends Unsubscribe implements OnInit {
  private SELECTOR_STATES = NM_SELECTOR_STATES;
  public years: NmDate[][] = [];

  get customYearCellTpl(): TemplateRef<any> | undefined {
    return this.stateService.customYearCellTpl;
  }

  get nmStatus$(): Observable<NM_VALID_STATUS> {
    return this.stateService.nmStatus$;
  }

  constructor(
    private readonly stateService: NmDatePickerStateService,
    private readonly yearModeService: YearModeService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.stateService.updatePicker$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.years = this.yearModeService.generateYears();
      this.cdr.detectChanges();
    });
  }

  public setYear(selectedYear: Date): void {
    this.stateService.displayDate = new Date(selectedYear);
    if (this.stateService.pickerModeLimitedBy === "year") {
      this.stateService.selectedDate = new Date(selectedYear);
      if (this.stateService.rangeSelectionActive) {
        this.stateService.selectedDateRange = yearRangeSetter(this.stateService.selectedDateRange, selectedYear);
        const [start, end] = this.stateService.selectedDateRange;
        if (start && end) this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
      } else if (this.stateService.nmMultiDateSelect) {
        const amongSelected = this.stateService.selectedDatesArray.findIndex((selectedDate) =>
          isSameYear(selectedDate, selectedYear)
        );
        if (amongSelected >= 0) {
          this.stateService.selectedDatesArray.splice(amongSelected, 1);
        } else {
          this.stateService.selectedDatesArray.push(selectedYear);
        }
        this.stateService.updatePicker$.next();
      } else {
        this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
      }
      this.stateService.emitSelectedDate$.next();
    } else {
      this.stateService.pickerMode$.next("month");
    }
    this.stateService.updatePicker$.next();
  }
}
