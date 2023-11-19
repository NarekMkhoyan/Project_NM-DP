import { Directive, ElementRef, Input, NgZone, OnDestroy, Renderer2 } from "@angular/core";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";
import { NmDate } from "../../interfaces/date.interface";
import { Subject, takeUntil } from "rxjs";
import { isSameDay, isSameMonth, isSameYear } from "../../utils/dateCompare";
import { getLastDayOfMonth } from "../../utils/lastDay";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";

@Directive({
  selector: "[nmHighlighter]",
})
export class NmDatePickerHighlighterDirective implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private borderValue: string = "0.5px dashed var(--nm-datepicker-primary-color)";
  private hoverEventListener: (() => void) | undefined;
  private rangeClassToApply = "inRange-cell-default";
  private pickerMode: NmDatePickerModeType = 'date';
  private cellDate: Date | undefined;

  @Input("nmHighlighter") set day(config: { dayValue: NmDate | undefined; mode: NmDatePickerModeType }) {
    if (!config.dayValue || config.dayValue.disabled) {
      return;
    }
    this.pickerMode = config.mode;
    this.cellDate = new Date(config.dayValue.date);
    this.styleInRangeCells(config.mode);
    this.handleDateCellHover();
  }

  constructor(
    private readonly el: ElementRef<HTMLDivElement>,
    private readonly stateService: NmDatePickerStateService,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {
    this.checkForRangeHighlight();
    this.applyStatusBasedHighlight();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.hoverEventListener && this.hoverEventListener();
  }

  private handleDateCellHover(): void {
    this.hoverEventListener = this.renderer.listen(this.el.nativeElement, "mouseover", () => {
      this.ngZone.runOutsideAngular(() => {
        const [, endDate] = this.stateService.selectedDateRange;
        if (!this.stateService.rangeSelectionActive || endDate || !this.cellDate) {
          return;
        }
        let possibleRangeEnd = new Date(this.cellDate);
        if (this.stateService.pickerModeLimitedBy === "month") {
          possibleRangeEnd = new Date(getLastDayOfMonth(new Date(this.cellDate)));
        }
        this.stateService.possibleRangeEnd$.next(possibleRangeEnd);
      });
    });
  }

  private styleInRangeCells(mode: NmDatePickerModeType): void {
    if (!this.cellDate) return;
    const [startDate, endDate] = this.stateService.selectedDateRange;
    if (startDate && endDate) {
      switch (mode) {
        case "month":
          if (isSameMonth(startDate, this.cellDate) || isSameMonth(endDate, this.cellDate)) {
            this.renderer.addClass(this.el.nativeElement, this.rangeClassToApply);
          }
          break;
        case "year":
          if (isSameYear(startDate, this.cellDate) || isSameYear(endDate, this.cellDate)) {
            this.renderer.addClass(this.el.nativeElement, this.rangeClassToApply);
          }
          break;
      }
      if (this.cellDate >= startDate && this.cellDate <= endDate) {
        this.renderer.addClass(this.el.nativeElement, this.rangeClassToApply);
      }
    }
  }

  private checkForRangeHighlight(): void {
    if (!this.stateService.rangeSelectionActive) {
      return;
    }
    this.stateService.possibleRangeEnd$.pipe(takeUntil(this.unsubscribe$)).subscribe((endDate) => {
      this.ngZone.runOutsideAngular(() => {
        const [startDate] = this.stateService.selectedDateRange;
        if (!endDate || !this.cellDate || !startDate) {
          return;
        }
        let start = new Date(startDate);
        let end = new Date(endDate);
        if (endDate < startDate) {
          start = new Date(endDate);
          start.setHours(0, 0, 0, 0);
          end = new Date(startDate);
          end.setHours(23, 59, 59, 999);
        }

        if (this.cellDate > start && this.cellDate < end) {
          this.renderer.setStyle(this.el.nativeElement.firstChild, "border-top", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement.firstChild, "border-bottom", this.borderValue);
          this.renderer.removeStyle(this.el.nativeElement.firstChild, "border-left");
          this.renderer.removeStyle(this.el.nativeElement.firstChild, "border-right");
        } else {
          this.renderer.removeStyle(this.el.nativeElement.firstChild, "border-top");
          this.renderer.removeStyle(this.el.nativeElement.firstChild, "border-bottom");
          this.renderer.removeStyle(this.el.nativeElement.firstChild, "border-left");
          this.renderer.removeStyle(this.el.nativeElement.firstChild, "border-right");
        }
        const startChecker =
          this.stateService.pickerModeLimitedBy === "month"
            ? isSameMonth(this.cellDate, start)
            : this.stateService.pickerModeLimitedBy === "year"
            ? isSameYear(this.cellDate, start)
            : isSameDay(this.cellDate, start);
        if (startChecker) {
          this.renderer.setStyle(this.el.nativeElement.firstChild, "border-top", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement.firstChild, "border-bottom", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement.firstChild, "border-left", this.borderValue);
        }
        const endChecker =
          this.stateService.pickerModeLimitedBy === "month"
            ? isSameMonth(this.cellDate, end)
            : this.stateService.pickerModeLimitedBy === "year"
            ? isSameYear(this.cellDate, end)
            : isSameDay(this.cellDate, end);
        if (endChecker) {
          this.renderer.setStyle(this.el.nativeElement.firstChild, "border-top", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement.firstChild, "border-bottom", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement.firstChild, "border-right", this.borderValue);
        }
      });
    });
  }

  private applyStatusBasedHighlight(): void {
    this.stateService.nmStatus$.pipe(takeUntil(this.unsubscribe$)).subscribe((status) => {
      this.rangeClassToApply = `inRange-cell-${status}`;
      this.styleInRangeCells(this.pickerMode);
    });
  }
}
