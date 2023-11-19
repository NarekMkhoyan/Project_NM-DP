import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from "@angular/core";
import { Observable, combineLatest, takeUntil } from "rxjs";
import { NmDatePickerHeaderService } from "../../../services/header/nm-date-picker-header.service";
import { NmDatePickerStateService } from "../../../services/state/nm-date-picker-state.service";
import { NmHeaderActionsGroup } from "../../../interfaces/header-action.interface";
import { NM_FALLBACK_LANGUAGE } from "../../../constants/localization.constant";
import { NmDatePickerModeType } from "../../../interfaces/picker-mode.type";
import { Unsubscribe } from "../../unsubscribe/unsubscribe.component";
import { NmLanguageType } from "../../../interfaces/language.type";

@Component({
  selector: "nm-date-picker-header",
  templateUrl: "./nm-date-picker-header.component.html",
  styleUrls: ["./nm-date-picker-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NmDatePickerHeaderComponent extends Unsubscribe implements OnInit {
  public pickerBodyWidth: number = 0;
  public selectedMonth: string = this.setMonthName(NM_FALLBACK_LANGUAGE);
  public selectedDate: Date = new Date();
  public language: NmLanguageType = NM_FALLBACK_LANGUAGE;

  get currentPickerMode$(): Observable<NmDatePickerModeType> {
    return this.stateService.pickerMode$;
  }

  get yearRangeHeader(): string {
    return `${this.stateService.decadeMarkingYear - 11} - ${this.stateService.decadeMarkingYear}`;
  }

  get headerActions(): NmHeaderActionsGroup | null {
    return this.stateService.nmHeaderActions;
  }

  get customHeaderTpl(): TemplateRef<any> | undefined {
    return this.stateService.customHeaderTpl;
  }

  constructor(
    private readonly headerService: NmDatePickerHeaderService,
    private readonly stateService: NmDatePickerStateService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.generateHeaderActions();
    this.stateService.pickerBodyWidth$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.pickerBodyWidth = res;
      this.cdr.detectChanges();
    });
    this.stateService.updatePicker$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.selectedMonth = this.setMonthName(this.language);
      this.selectedDate = new Date(this.stateService.displayDate);
      this.cdr.markForCheck();
    });
    this.stateService.currentLanguage$.pipe(takeUntil(this.unsubscribe$)).subscribe((currentLanguage) => {
      this.selectedMonth = this.setMonthName(currentLanguage);
      this.language = currentLanguage;
      this.cdr.markForCheck();
    });
  }

  private setMonthName(language: NmLanguageType): string {
    if (!this.stateService.displayDate) {
      return "";
    }
    const selectedMonthIndex = this.stateService.displayDate.getMonth();
    let monthName = this.stateService.localization[NM_FALLBACK_LANGUAGE].MONTH_NAMES_SHORT[selectedMonthIndex];
    if (this.stateService.localization[language]) {
      monthName = this.stateService.localization[language].MONTH_NAMES_SHORT[selectedMonthIndex];
    }
    return monthName;
  }

  private generateHeaderActions(): void {
    combineLatest([this.stateService.updatePicker$, this.stateService.pickerMode$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([, pickerMode]) => {
        this.headerService.generateHeaderActionButtons(pickerMode);
        this.cdr.markForCheck();
      });
  }
}
