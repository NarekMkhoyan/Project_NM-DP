import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { combineLatest, map, takeUntil } from "rxjs";
import { NmDatePickerStateService } from "../../../services/state/nm-date-picker-state.service";
import { NmDatePickerMonthModeService } from "../../../services/month-mode/month-mode.service";
import { NM_SELECTOR_STATES } from "../../../constants/selector-states.enum";
import { Unsubscribe } from "../../unsubscribe/unsubscribe.component";
import { NmDate } from "../../../interfaces/date.interface";

@Component({
  selector: "nm-date-picker-month-mode",
  templateUrl: "./nm-date-picker-month-mode.component.html",
  styleUrls: ["./nm-date-picker-month-mode.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NmDatePickerMonthModeComponent extends Unsubscribe implements OnInit {
  public months: NmDate[][] = [];
  private SELECTOR_STATES = NM_SELECTOR_STATES;

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
      this.stateService.emitSelectedDate$.next();
      this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
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
