import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IHeaderActions } from "../../interfaces/header-action.interface";
import { NmDatePickerModeType } from "../../interfaces/picker-mode.type";

@Injectable()
export class NmPublicApiService {
  /**
   * headerActions: IHeaderActions | null
   *
   * The combining object that contains the 4 action objects used inside the date picker header
   *
   * Includes:
   * * The previous button action
   * * The next button action
   * * Switch to month mode action
   * * Switch to year mode action
   *
   * \* Each separate nmDatePicker has its own instance of these actions
   */
  public nmHeaderActions: IHeaderActions | null = null;

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
   * A Subject that emits when the the 'Next page' button (arrow right by default) is pressed in the date picker header (Works for default/custom templates).
   */
  public nmNextActionTriggered$: Subject<void> = new Subject<void>();

  /**
   * A Subject that emits when the the 'Previous page' button (arrow left by default) is pressed in the date picker header (Works for default/custom templates).
   */
  public nmPrevActionTriggered$: Subject<void> = new Subject<void>();

  /**
   * A BehaviorSubject that emits the date picker's current operation mode ('date' | 'month' | 'year') upon change.
   */
  public nmPickerCurrentMode$: BehaviorSubject<NmDatePickerModeType> = new BehaviorSubject<NmDatePickerModeType>(
    "date"
  );
}
