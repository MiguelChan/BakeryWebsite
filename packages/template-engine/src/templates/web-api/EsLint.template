module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: [
    'modules-newline',
    'import',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'max-len': ['error', {
        'code': 120,
        'ignoreComments': true,
    }],
    'import/prefer-default-export': 0,
    'import/export': 0,
    'class-methods-use-this': ['warn'],
    'modules-newline/import-declaration-newline': 'warn',
    'modules-newline/export-declaration-newline': 'warn',
  },
  ignorePatterns: [
      '**/build/**',
  ],
};