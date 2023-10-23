import { ReplaySubject } from "rxjs";

export interface IHeaderAction {
  pickerDisplayDate: Date;
  disabled: boolean;
  onClick: () => void;
  clickObserver$: ReplaySubject<number>;
}

export class HeaderAction implements IHeaderAction {
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

export interface IHeaderActions {
  nextAction: HeaderAction;
  prevAction: HeaderAction;
  monthAction: HeaderAction;
  yearAction: HeaderAction;
}

export class HeaderActions implements IHeaderActions {
  nextAction: HeaderAction;
  prevAction: HeaderAction;
  monthAction: HeaderAction;
  yearAction: HeaderAction;

  constructor(nextAction: HeaderAction, prevAction: HeaderAction, monthAction: HeaderAction, yearAction: HeaderAction) {
    this.nextAction = nextAction;
    this.prevAction = prevAction;
    this.monthAction = monthAction;
    this.yearAction = yearAction;
  }
}
