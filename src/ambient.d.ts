declare module 'cli-spinner' {
  export class Spinner {
    constructor(text?: string);
    setSpinnerString(spinnerString: string): void;
    setSpinnerDelay(delay: number): void;
    start(): void;
    stop(clear?: boolean): void;
  }
  const cliSpinner: { Spinner: typeof Spinner };
  export default cliSpinner;
}
