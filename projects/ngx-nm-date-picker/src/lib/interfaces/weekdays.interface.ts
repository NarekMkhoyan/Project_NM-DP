export interface NmWeekdayInterface {
  name: string;
  index: number;
  isWeekend: boolean;
}

export class NmWeekday implements NmWeekdayInterface {
  name: string;
  index: number;
  isWeekend: boolean = false;

  constructor(weekdayNames: string[], index: number) {
    this.index = index;
    this.name = weekdayNames[index];
    if (index === 0 || index === 6) {
      this.isWeekend = true;
    }
  }
}
