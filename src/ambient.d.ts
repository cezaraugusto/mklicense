declare module 'inquirer' {
  export interface Question {
    type?: string;
    name?: string;
    message?: string;
    choices?: string[];
    filter?: (value: string) => string;
    default?: () => string | number;
    when?: (answers: Record<string, string>) => unknown;
  }
  const inquirer: {
    prompt(questions: Question[]): Promise<Record<string, string>>;
  }

  export default inquirer
}

declare module 'git-user-name' {
  export default function username (): string | null
}

declare module 'cli-spinner' {
  export class Spinner {
    constructor (text?: string)
    setSpinnerString (spinnerString: string): void
    setSpinnerDelay (delay: number): void
    start (): void
    stop (clear?: boolean): void
  }
  const cliSpinner: {Spinner: typeof Spinner}

  export default cliSpinner
}
