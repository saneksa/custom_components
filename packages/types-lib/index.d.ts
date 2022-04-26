/// <reference path="global.d.ts" />

import React from "react";

type TComponent = () => React.ComponentType<ICustomComponentsProps>;

declare global {
  interface ICustomComponentsProps {
    counter: number;

    increase: (count: number) => void;
    decrease: (count: number) => void;
  }

  interface ICustomComponents {
    components: Map<string, TComponent>;

    addComponent: (name: string, component: TComponent) => void;
  }
  interface Window {
    react: React;
    React: React;
    im: {
      component: ICustomComponents;
    };
  }
}

export {};
