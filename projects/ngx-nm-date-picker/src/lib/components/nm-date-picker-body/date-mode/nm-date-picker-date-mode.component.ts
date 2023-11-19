import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from "@angular/core";
import { Observable, combineLatest, map, takeUntil } from "rxjs";
import { NmDatePickerStateService } from "../../../services/state/nm-date-picker-state.service";
import { NmHolidaysDisplayType } from "../../../interfaces/holiday-display.type";
import { DateModeService } from "../../../services/date-mode/date-mode.service";
import { NM_SELECTOR_STATES } from "../../../constants/selector-states.enum";
import { NM_VALID_STATUS } from "../../../constants/valid-status.enum";
import { Unsubscribe } from "../../unsubscribe/unsubscribe.component";
import { NmWeekday } from "../../../interfaces/weekdays.interface";
import { dateRangeSetter } from "../../../utils/dateRangeSetter";
import { divideIntoChunks } from "../../../utils/chunkDivider";
import { NmDate } from "../../../interfaces/date.interface";
import { isSameDay } from "../../../utils/dateCompare";

@Component({
  selector: "nm-date-picker-date-mode",
  templateUrl: "./nm-date-picker-date-mode.component.html",
  styleUrls: ["./nm-date-picker-date-mode.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NmDatePickerDateModeComponent extends Unsubscribe implements OnInit {
  private SELECTOR_STATES = NM_SELECTOR_STATES;
  private datesBackup: NmDate[] = [];
  public dates: NmDate[][] = [];
  public weekdays: NmWeekday[] = [];

  @Input() weekendDisplayMethod: NmHolidaysDisplayType = "end";
  @Input() markWeekends: boolean = false;

  get customDayCellTpl(): TemplateRef<any> | undefined {
    return this.stateService.customDayCellTpl;
  }

  get customWeekCellTpl(): TemplateRef<any> | undefined {
    return this.stateService.customWeekCellTpl;
  }

  get nmStatus$(): Observable<NM_VALID_STATUS> {
    return this.stateService.nmStatus$;
  }

  constructor(
    private readonly stateService: NmDatePickerStateService,
    private readonly dateModeService: DateModeService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.initDates();
  }

  public setDate(day: NmDate): void {
    this.stateService.selectedDate = new Date(day.date);
    this.stateService.displayDate = new Date(day.date);
    if (this.stateService.rangeSelectionActive || (!day.isNextMarker && !day.isPrevMarker)) {
      this.dates = divideIntoChunks<NmDate>(this.dateModeService.updateSelected(this.datesBackup), 6, 7);
    }
    if (this.stateService.rangeSelectionActive) {
      this.stateService.selectedDateRange = dateRangeSetter(this.stateService.selectedDateRange, day.date);
      const [start, end] = this.stateService.selectedDateRange;
      this.stateService.updatePicker$.next();
      if (start && end) {
        this.stateService.rangeLimits = [null, null];
        this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
      }
    } else if (this.stateService.nmMultiDateSelect) {
      const amongSelected = this.stateService.selectedDatesArray.findIndex((selectedDate) =>
        isSameDay(selectedDate, day.date)
      );
      if (amongSelected >= 0) {
        this.stateService.selectedDatesArray.splice(amongSelected, 1);
      } else {
        this.stateService.selectedDatesArray.push(day.date);
      }
      this.stateService.updatePicker$.next();
    } else {
      this.stateService.updatePicker$.next();
      this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
    }

    this.stateService.emitSelectedDate$.next();
    this.cdr.markForCheck();
  }

  private initDates(): void {
    combineLatest([this.stateService.updatePicker$, this.stateService.currentLanguage$])
      .pipe(
        takeUntil(this.unsubscribe$),
        map(([, currentLanguage]) => {
          this.datesBackup = this.dateModeService.generateDays(
            this.stateService.displayDate,
            this.weekendDisplayMethod
          );
          this.dates = divideIntoChunks(
            this.dateModeService.updateSelected(
              this.dateModeService.generateDays(this.stateService.displayDate, this.weekendDisplayMethod)
            ),
            6,
            7
          );
          this.weekdays = this.dateModeService.generateWeekdays(this.weekendDisplayMethod, currentLanguage);
        })
      )
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }
}
