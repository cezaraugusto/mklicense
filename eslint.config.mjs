import ts from 'eslint-config-auditor/ts'

export default [
  {ignores: ['dist/**', 'build/**', 'out/**', 'coverage/**', '**/__fixtures__/**', '**/fixtures/**', '**/__mocks__/**', '**/__snapshots__/**', '**/*.min.js', '**/vendor/**', '**/*.json', 'eslint.config.mjs']},
  ...ts,
]
