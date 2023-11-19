import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";

@Injectable()
export class NmActionNotifierService {
  /**
   * A Subject observing the selector state in 'dropdown' display mode.
   *
   * Emits when the dropdown date picker opens (Works for default/custom templates).
   */
  public nmDropdownOpenEvent$: Subject<void> = new Subject<void>();

  /**
   * A Subject observing the selector state in 'dropdown' display mode.
   *
   * Emits when the dropdown date picker closes (Works for default/custom templates).
   */
  public nmDropdownCloseEvent$: Subject<void> = new Subject<void>();

  /**
   * A Subject that emits when the 'Next page' button (arrow right by default) is pressed in the date picker header (Works for default/custom templates).
   */
  public nmNextActionTriggered$: Subject<void> = new Subject<void>();

  /**
   * A Subject that emits when the 'Previous page' button (arrow left by default) is pressed in the date picker header (Works for default/custom templates).
   */
  public nmPrevActionTriggered$: Subject<void> = new Subject<void>();

  /**
   * A BehaviorSubject that emits the date picker's current operation mode ('date' | 'month' | 'year') upon change.
   */
  public nmPickerCurrentMode$: BehaviorSubject<NmDatePickerModeType> = new BehaviorSubject<NmDatePickerModeType>(
    "date"
  );

  /**
   *  A Subject that emits when the user clicks the clear input button in the selector.
   */
  public nmClearActionTriggered$: Subject<void> = new Subject<void>();
}
