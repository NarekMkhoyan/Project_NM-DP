import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { Observable } from "rxjs";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";
import { swipeLeftAnimation, swipeRightAnimation } from "../../utils/animations";
import { NmHeaderActionsGroup } from "../../interfaces/header-action.interface";
import { NmHolidaysDisplayType } from "../../interfaces/holiday-display.type";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";

@Component({
  selector: "nm-date-picker-body",
  templateUrl: "./nm-date-picker-body.component.html",
  styleUrls: ["./nm-date-picker-body.component.scss"],
  animations: [swipeLeftAnimation, swipeRightAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NmDatePickerBodyComponent implements AfterViewInit, OnDestroy {
  private bodyResizeObserver!: ResizeObserver;

  @Input() markWeekends: boolean = false;
  @Input() weekendDisplayMethod: NmHolidaysDisplayType = "end";
  @ViewChild("datePickerBody") datePickerBody!: ElementRef<HTMLDivElement>;

  get currentPickerMode$(): Observable<NmDatePickerModeType> {
    return this.stateService.pickerMode$;
  }

  get headerActions(): NmHeaderActionsGroup | null {
    return this.stateService.nmHeaderActions;
  }

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly stateService: NmDatePickerStateService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformServer(this.platformId)) {
      this.setPickerBodyWidth();
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformServer(this.platformId)) {
      this.bodyResizeObserver.unobserve(this.datePickerBody.nativeElement);
    }
  }

  private setPickerBodyWidth(): void {
    this.bodyResizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        this.stateService.pickerBodyWidth$.next(entry.target.clientWidth);
      });
    });
    this.bodyResizeObserver.observe(this.datePickerBody.nativeElement);
  }
}
