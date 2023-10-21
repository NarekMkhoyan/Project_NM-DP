import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from "@angular/core";
import { combineLatest, map, takeUntil } from "rxjs";
import { NmDatePickerStateService } from "../../../services/state/nm-date-picker-state.service";
import { DateModeService } from "../../../services/date-mode/date-mode.service";
import { NmHolidaysDisplayType } from "../../../interfaces/holiday-display.type";
import { NM_SELECTOR_STATES } from "../../../constants/selector-states.enum";
import { Unsubscribe } from "../../unsubscribe/unsubscribe.component";
import { NmWeekday } from "../../../interfaces/weekdays.interface";
import { divideIntoChunks } from "../../../utils/chunkDivider";
import { NmDate } from "../../../interfaces/date.interface";
import { dateRangeSetter } from "../../../utils/dateRangeSetter";

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
   // TODO: make optional
    // if (day.isNextMarker || day.isPrevMarker) {
    //   return;
    // }
    this.stateService.selectedDate = new Date(day.date);
    this.stateService.displayDate = new Date(day.date);
    if (this.stateService.rangeSelectionActive || (!day.isNextMarker && !day.isPrevMarker)) {
      this.dates = divideIntoChunks<NmDate>(this.dateModeService.updateSelected(this.datesBackup), 6, 7);
    }
    if (this.stateService.rangeSelectionActive) {
      this.stateService.selectedDateRange = dateRangeSetter(this.stateService.selectedDateRange, day.date);
      const [start, end] = this.stateService.selectedDateRange;
      this.stateService.updatePicker$.next();
      if (start && end) this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
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
