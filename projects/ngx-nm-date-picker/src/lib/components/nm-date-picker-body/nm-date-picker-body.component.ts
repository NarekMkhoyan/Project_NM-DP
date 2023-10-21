import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";
import { NmDatePickerStateService } from "../../services/state/nm-date-picker-state.service";
import { NmPublicApiService } from "../../services/public-apis/public-apis.service";
import { swipeLeftAnimation, swipeRightAnimation } from "../../utils/animations";
import { NmHolidaysDisplayType } from "../../interfaces/holiday-display.type";
import { IHeaderActions } from "../../interfaces/header-action.interface";
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

  get headerActions(): IHeaderActions | null {
    return this.publicApiService.headerActions;
  }

  constructor(
    private readonly stateService: NmDatePickerStateService,
    private readonly publicApiService: NmPublicApiService
  ) {}

  ngAfterViewInit(): void {
    this.setPickerBodyWidth();
  }

  ngOnDestroy(): void {
    this.bodyResizeObserver.unobserve(this.datePickerBody.nativeElement);
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
