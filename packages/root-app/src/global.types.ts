declare global {
  interface Window {
    im: {
      increase: (count: number) => void;
      decrease: (count: number) => void;
    };
  }
}

export {};
