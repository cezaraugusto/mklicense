import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import cliSpinner from 'cli-spinner';
import username from 'git-user-name';
import inquirer from 'inquirer';
import log from 'log-md';

const { Spinner } = cliSpinner;

export interface LicenseAnswers {
  licenseList: string;
  license_year?: string;
  author_name?: string;
  project_description?: string;
}

/**
 * Fill a license template's placeholders (year, author, description)
 * across the placeholder styles used by the GitHub license templates.
 */
export function customizeLicense(
  body: string,
  answers: LicenseAnswers,
): string {
  const year = String(answers.license_year ?? '');
  const author = answers.author_name ?? '';
  const description = answers.project_description ?? '';

  return body
    .replace('[year]', year)
    .replace('{yyyy}', year)
    .replace('{year}', year)
    .replace('<year>', year)
    .replace('[fullname]', author)
    .replace('{name of copyright owner}', author)
    .replace('{name of author}', author)
    .replace('<name of author>', author)
    .replace(
      "<one line to give the program's name and a brief idea of what it does.>",
      description,
    )
    .replace(
      "{one line to give the program's name and a brief idea of what it does.}",
      description,
    );
}

/**
 * Fetch a license template from the GitHub Licenses API,
 * the same templates choosealicense.com serves.
 */
export async function fetchLicense(licenseKey: string): Promise<string> {
  const url = `https://api.github.com/licenses/${licenseKey}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'mklicense-cli',
      Accept: 'application/vnd.github+json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching ${url}`);
  }
  const data = (await response.json()) as { body: string };
  return data.body;
}

const questions = [
  {
    type: 'list',
    name: 'licenseList',
    message: 'Select your license:',
    choices: [
      'Unlicense',
      'MIT',
      'Apache 2.0',
      'MPL 2.0',
      'LGPL 3.0',
      'GPL 3.0',
      'AGPL 3.0',
    ],
    filter: (value: string) => value.toLowerCase().replace(/ /g, '-'),
  },
  {
    type: 'input',
    name: 'license_year',
    message: "The project's license begins in:",
    default: () => new Date().getFullYear(),
    when: (answers: Record<string, string>) =>
      answers.licenseList.match(/(mit|apache|^gpl|agpl)/),
  },
  {
    type: 'input',
    name: 'author_name',
    message: "The project's author full name:",
    default: () => username() || '',
    when: (answers: Record<string, string>) =>
      answers.licenseList.match(/(mit|apache|^gpl|agpl)/),
  },
  {
    type: 'input',
    name: 'project_description',
    message:
      "Give the project's name and a brief idea of what it does (one line):\n",
    default: () =>
      "mkdocs. A CLI tool that generates your next project's License. Available on NPM.",
    when: (answers: Record<string, string>) =>
      answers.licenseList.match(/(^gpl|agpl)/),
  },
];

/** Run the interactive CLI: prompt, fetch, customize, write LICENSE. */
export default async function run(): Promise<void> {
  const answers = (await inquirer.prompt(questions)) as unknown as LicenseAnswers;

  const spinner = new Spinner('%s generating license');
  spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');
  spinner.setSpinnerDelay(100);
  spinner.start();

  try {
    const body = await fetchLicense(answers.licenseList);
    await fs.writeFile('LICENSE', customizeLicense(body, answers), 'utf-8');
    spinner.stop(true);
    log(
      `**Done.** License created!\n\nYour license is under: \`${path.resolve('.')}\`\n\nLawyers are now happy.`,
      true,
    );
  } catch (err) {
    spinner.stop(true);
    log(
      `**Error:** getting the license was not possible: ${(err as Error).message}`,
    );
    process.exitCode = 1;
  }
}
