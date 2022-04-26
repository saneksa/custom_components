import set from "lodash.set";
import { makeAutoObservable } from "mobx";
import React from "react";

type TComponent = () => React.ComponentType<any>;

export class CustomComponents implements ICustomComponents {
  private _components = new Map<string, TComponent>();

  constructor() {
    makeAutoObservable(this);
  }

  public get components() {
    return this._components;
  }

  public addComponent(name: string, component: TComponent) {
    this._components.set(name, component);
  }
}
