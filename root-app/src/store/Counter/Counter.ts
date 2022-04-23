import { action, makeObservable, observable } from "mobx";
import set from "lodash.set";

export class Counter {
  public _counter = 0;

  constructor() {
    makeObservable(this, {
      _counter: observable,
      increase: action.bound,
      decrease: action.bound,
    });

    set(window, "im.increase", this.increase);
    set(window, "im.decrease", this.decrease);
  }

  public get counter() {
    return this._counter;
  }

  public increase(count: number = 1) {
    this._counter += count;
  }

  public decrease(count: number = 1) {
    this._counter -= count;
  }
}
