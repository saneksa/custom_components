import React from "react";

declare global {
  interface Window {
    React: typeof React;
    im: {
      component: ICustomComponents;
    };
  }
}

export {};
