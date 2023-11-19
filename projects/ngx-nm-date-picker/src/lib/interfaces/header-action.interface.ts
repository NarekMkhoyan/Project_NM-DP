import { ReplaySubject } from "rxjs";

export interface NmHeaderAction {
  pickerDisplayDate: Date;
  disabled: boolean;
  onClick: () => void;
  clickObserver$: ReplaySubject<number>;
}

export class HeaderAction implements NmHeaderAction {
  pickerDisplayDate: Date;
  disabled: boolean = false;
  onClick: () => void = () => {};
  clickObserver$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(pickerDisplayDate: Date) {
    this.pickerDisplayDate = pickerDisplayDate;
    this.disabled = false;
  }

  public setOnClickHandler(clickHandler: () => void): this {
    this.onClick = () => {
      this.clickObserver$.next(Math.random());
      return clickHandler();
    };

    return this;
  }

  public setDisplayDate(newDisplayDate: Date): this {
    this.pickerDisplayDate = newDisplayDate;
    return this;
  }
}

export interface NmHeaderActionsGroup {
  nextAction: NmHeaderAction;
  prevAction: NmHeaderAction;
  monthAction: NmHeaderAction;
  yearAction: NmHeaderAction;
}

export class HeaderActions implements NmHeaderActionsGroup {
  nextAction: NmHeaderAction;
  prevAction: NmHeaderAction;
  monthAction: NmHeaderAction;
  yearAction: NmHeaderAction;

  constructor(nextAction: NmHeaderAction, prevAction: NmHeaderAction, monthAction: NmHeaderAction, yearAction: NmHeaderAction) {
    this.nextAction = nextAction;
    this.prevAction = prevAction;
    this.monthAction = monthAction;
    this.yearAction = yearAction;
  }
}
