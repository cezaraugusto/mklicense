import ts from 'eslint-config-auditor/ts'
import stylistic from 'eslint-config-auditor/stylistic'
import vitest from 'eslint-config-auditor/vitest'

export default [
  {ignores: ['dist/**', 'build/**', 'out/**', 'coverage/**', '**/__fixtures__/**', '**/fixtures/**', '**/__mocks__/**', '**/__snapshots__/**', '**/*.min.js', '**/vendor/**', '**/*.json', 'eslint.config.mjs']},
  ...ts,
  ...stylistic,
  ...vitest.map((c) => ({
    ...c,
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}']
  })),
]
