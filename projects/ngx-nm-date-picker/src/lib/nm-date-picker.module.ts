import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NmDatePickerDropdownSelectorComponent } from "./components/nm-date-picker-dropdown-selector/nm-date-picker-dropdown-selector.component";
import { NmDatePickerHeaderComponent } from "./components/nm-date-picker-header/nm-date-picker-header/nm-date-picker-header.component";
import { NmDatePickerMonthModeComponent } from "./components/nm-date-picker-body/month-mode/nm-date-picker-month-mode.component";
import { NmDatePickerDateModeComponent } from "./components/nm-date-picker-body/date-mode/nm-date-picker-date-mode.component";
import { NmDatePickerYearModeComponent } from "./components/nm-date-picker-body/year-mode/nm-date-picker-year-mode.component";
import { NmDatePickerSelectorStateDirective } from "./directives/selector-state/nm-date-picker-selector-state.directive";
import { NmDatePickerHighlighterDirective } from "./directives/highlighter/nm-date-picker-highlighter.directive";
import { NmDropdownPositionDirective } from "./directives/nmDropdownPosition/nm-dropdown-position.directive";
import { NmDatePickerBodyComponent } from "./components/nm-date-picker-body/nm-date-picker-body.component";
import { NmDatePickerThemeDirective } from "./directives/theme-change/nm-date-picker-theme.directive";
import { NmDatePickerComponent } from "./components/nm-date-picker/nm-date-picker.component";
import { NmTriggerDirective } from "./directives/nmTrigger/nm-trigger.directive";
import { Unsubscribe } from "./components/unsubscribe/unsubscribe.component";

@NgModule({
  declarations: [
    Unsubscribe,
    NmTriggerDirective,
    NmDatePickerComponent,
    NmDatePickerBodyComponent,
    NmDatePickerThemeDirective,
    NmDatePickerHeaderComponent,
    NmDatePickerYearModeComponent,
    NmDatePickerDateModeComponent,
    NmDatePickerMonthModeComponent,
    NmDatePickerSelectorStateDirective,
    NmDatePickerDropdownSelectorComponent,
    NmDatePickerHighlighterDirective,
    NmDropdownPositionDirective,
  ],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [NmDatePickerComponent, NmDatePickerThemeDirective],
})
export class NgxNmDatePickerModule {}
