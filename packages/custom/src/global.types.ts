declare global {
  interface Window {
    im: {
      increase: (count: number) => void;
      decrease: (count: number) => void;
    };
    __WEB_VITALS_POLYFILL__: boolean;
  }
}

export {};
