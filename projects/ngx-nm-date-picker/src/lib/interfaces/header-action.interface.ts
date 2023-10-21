import { ReplaySubject } from "rxjs";

export interface IHeaderAction {
  disabled: boolean;
  onClick: () => void;
  clickObserver$: ReplaySubject<number>;
}

export class HeaderAction implements IHeaderAction {
  disabled: boolean = false;
  onClick: () => void = () => {};
  clickObserver$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor() {
    this.disabled = false;
  }

  public setOnClickHandler(clickHandler: () => void): this {
    this.onClick = () => {
      this.clickObserver$.next(Math.random());
      return clickHandler();
    };

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
