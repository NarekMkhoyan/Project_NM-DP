import { Injectable } from "@angular/core";
import { IHeaderActions } from "../../interfaces/header-action.interface";

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
}
