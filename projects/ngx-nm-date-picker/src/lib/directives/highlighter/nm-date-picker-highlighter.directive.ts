import { Directive, ElementRef, Input, NgZone, OnDestroy, Renderer2 } from "@angular/core";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";
import { NmDate } from "../../interfaces/date.interface";
import { Subject, takeUntil } from "rxjs";
import { isSameDay } from "../../utils/dateCompare";

@Directive({
  selector: "[nmHighlighter]",
})
export class NmDatePickerHighlighterDirective implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private borderValue: string = "0.5px dashed var(--nm-datepicker-primary-color)";
  private hoverEventListener: (() => void) | undefined;
  private cellDate: Date | undefined;

  @Input("nmHighlighter") set day(dayValue: NmDate | undefined) {
    if (!dayValue) {
      return;
    }
    this.cellDate = new Date(dayValue.date);
    this.styleInRangeCells();
    this.handleDateCellHover();
  }

  constructor(
    private readonly el: ElementRef<HTMLDivElement>,
    private readonly stateService: NmDatePickerStateService,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {
    this.checkForRangeHighlight();
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
        this.stateService.possibleRangeEnd$.next(new Date(this.cellDate));
      });
    });
  }

  private styleInRangeCells(): void {
    if (!this.cellDate) return;
    const [startDate, endDate] = this.stateService.selectedDateRange;
    if (startDate && this.cellDate >= startDate && endDate && this.cellDate <= endDate) {
      this.renderer.addClass(this.el.nativeElement, "inRange-cell");
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
          end = new Date(startDate);
        }
        // set borders of in-range cells
        if (this.cellDate > start && this.cellDate < end) {
          this.renderer.setStyle(this.el.nativeElement, "border-top", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement, "border-bottom", this.borderValue);
          this.renderer.removeStyle(this.el.nativeElement, "border-left");
          this.renderer.removeStyle(this.el.nativeElement, "border-right");
        } else if (isSameDay(this.cellDate, start)) {
          this.renderer.setStyle(this.el.nativeElement, "border-top", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement, "border-bottom", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement, "border-left", this.borderValue);
        } else if (isSameDay(this.cellDate, end)) {
          this.renderer.setStyle(this.el.nativeElement, "border-top", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement, "border-bottom", this.borderValue);
          this.renderer.setStyle(this.el.nativeElement, "border-right", this.borderValue);
        } else {
          this.renderer.removeStyle(this.el.nativeElement, "border-top");
          this.renderer.removeStyle(this.el.nativeElement, "border-bottom");
          this.renderer.removeStyle(this.el.nativeElement, "border-left");
          this.renderer.removeStyle(this.el.nativeElement, "border-right");
        }
        // corrects the dashed borders of the starting and ending cells in range
        if (!isSameDay(startDate, endDate)) {
          if (startDate < endDate) {
            this.renderer.removeStyle(this.el.nativeElement, "border-left");
            if (isSameDay(this.cellDate, startDate)) {
              this.renderer.setStyle(this.el.nativeElement, "border-left", this.borderValue);
            }
          } else {
            this.renderer.removeStyle(this.el.nativeElement, "border-left");
            if (isSameDay(this.cellDate, endDate)) {
              this.renderer.setStyle(this.el.nativeElement, "border-left", this.borderValue);
            }
          }
        }
      });
    });
  }
}
