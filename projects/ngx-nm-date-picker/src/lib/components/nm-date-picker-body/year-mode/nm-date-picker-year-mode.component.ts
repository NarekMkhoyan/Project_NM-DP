import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NmDatePickerStateService } from "../../../services/state/nm-date-picker-state.service";
import { YearModeService } from "../../../services/year-mode/year-mode.service";
import { Unsubscribe } from "../../unsubscribe/unsubscribe.component";
import { NmDate } from "../../../interfaces/date.interface";
import { NM_SELECTOR_STATES } from "../../../constants/selector-states.enum";

@Component({
  selector: "nm-date-picker-year-mode",
  templateUrl: "./nm-date-picker-year-mode.component.html",
  styleUrls: ["./nm-date-picker-year-mode.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NmDatePickerYearModeComponent extends Unsubscribe implements OnInit {
  private SELECTOR_STATES = NM_SELECTOR_STATES;
  public years: NmDate[][] = [];

  constructor(
    private readonly stateService: NmDatePickerStateService,
    private readonly yearModeService: YearModeService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.stateService.updatePicker$.subscribe(() => {
      this.years = this.yearModeService.generateYears();
      this.cdr.detectChanges();
    });
  }

  public setYear(selectedYear: Date): void {
    this.stateService.displayDate = new Date(selectedYear);
    if (this.stateService.pickerModeLimitedBy === "year") {
      this.stateService.selectedDate = new Date(selectedYear);
      this.stateService.emitSelectedDate$.next();
      this.stateService.dropdownSelectorState$.next(this.SELECTOR_STATES.INACTIVE);
    } else {
      this.stateService.pickerMode$.next("month");
    }
    this.stateService.updatePicker$.next();
  }
}
