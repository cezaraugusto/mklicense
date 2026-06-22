import {execSync} from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import {input, select} from '@inquirer/prompts'
import cliSpinner from 'cli-spinner'
import log from 'log-md'

const {Spinner} = cliSpinner

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
export function customizeLicense (
  body: string,
  answers: LicenseAnswers
): string {
  const year = String(answers.license_year ?? '')
  const author = answers.author_name ?? ''
  const description = answers.project_description ?? ''

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
      description
    )
    .replace(
      "{one line to give the program's name and a brief idea of what it does.}",
      description
    )
}

/**
 * Fetch a license template from the GitHub Licenses API,
 * the same templates choosealicense.com serves.
 */
export async function fetchLicense (licenseKey: string): Promise<string> {
  const url = `https://api.github.com/licenses/${licenseKey}`
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'mklicense-cli',
      Accept: 'application/vnd.github+json'
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching ${url}`)
  }

  const data = (await response.json()) as {body: string}

  return data.body
}

/** Resolve the git user's name without external dependencies. */
function gitUserName (): string {
  try {
    return execSync('git config user.name', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim()
  } catch {
    return ''
  }
}

const choices = [
  {name: 'Unlicense', value: 'unlicense'},
  {name: 'MIT', value: 'mit'},
  {name: 'Apache 2.0', value: 'apache-2.0'},
  {name: 'MPL 2.0', value: 'mpl-2.0'},
  {name: 'LGPL 3.0', value: 'lgpl-3.0'},
  {name: 'GPL 3.0', value: 'gpl-3.0'},
  {name: 'AGPL 3.0', value: 'agpl-3.0'}
]

/** Run the interactive CLI: prompt, fetch, customize, write LICENSE. */
export default async function run (): Promise<void> {
  const licenseList = await select({message: 'Select your license:', choices})
  const answers: LicenseAnswers = {licenseList}

  if (/(mit|apache|^gpl|agpl)/.test(licenseList)) {
    answers.license_year = await input({
      message: "The project's license begins in:",
      default: String(new Date().getFullYear())
    })
    answers.author_name = await input({
      message: "The project's author full name:",
      default: gitUserName()
    })
  }

  if (/(^gpl|agpl)/.test(licenseList)) {
    answers.project_description = await input({
      message:
        "Give the project's name and a brief idea of what it does (one line):",
      default:
        "mklicense. A CLI tool that generates your next project's License. Available on NPM."
    })
  }

  const spinner = new Spinner('%s generating license')

  spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷')
  spinner.setSpinnerDelay(100)
  spinner.start()

  try {
    const body = await fetchLicense(answers.licenseList)

    await fs.writeFile('LICENSE', customizeLicense(body, answers), 'utf-8')
    spinner.stop(true)
    log(
      `**Done.** License created!\n\nYour license is under: \`${path.resolve('.')}\`\n\nLawyers are now happy.`,
      true
    )
  } catch (err) {
    spinner.stop(true)
    log(
      `**Error:** getting the license was not possible: ${(err as Error).message}`
    )
    process.exitCode = 1
  }
}
