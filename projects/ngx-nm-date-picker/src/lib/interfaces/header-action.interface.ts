import { Subject } from "rxjs";

export interface IHeaderAction {
  disabled: boolean;
  onClick: () => void;
  clickObserver$: Subject<boolean>;
}

export class HeaderAction implements IHeaderAction {
  disabled: boolean = false;
  onClick: () => void = () => {};
  clickObserver$: Subject<boolean> = new Subject<boolean>();
  private static animationState: boolean = false;

  constructor() {
    this.disabled = false;
  }

  public setOnClickHandler(clickHandler: () => void): this {
    this.onClick = () => {
      HeaderAction.animationState = !HeaderAction.animationState;
      this.clickObserver$.next(HeaderAction.animationState);
      return clickHandler();
    };

    return this;
  }
}
