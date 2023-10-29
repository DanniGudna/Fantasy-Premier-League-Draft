module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // Jest global variables like `it` etc.
    node: true, // Defines things like process.env when generating through node
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.tsx'],
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'simple-import-sort',
  ],
  globals: {

    JSX: true,
  },
  rules: {
    'no-plusplus': 'off',
    'no-console': 'warn',
    'operator-linebreak': 'off',
    'import/extensions': 'off',
    'linebreak-style': 0,
    'object-curly-newline': 'off',
    'prefer-template': 'off',
    'no-restricted-syntax': ['off', "BinaryExpression[operator='of']"],
    'prefer-destructuring': 'off',
    'brace-style': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    // note you must disable the base rule as it can report incorrect errors
    // - vegna react used before defined error
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/require-default-props': 0,
    'max-len': ['error', { code: 130, ignoreComments: true, ignoreStrings: true, ignoreUrls: true }],
    // '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/state-in-constructor': 0,
    'react/jsx-boolean-value': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-param-reassign': ['error', { props: false }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-vars': ['error', { ignoreCase: true }],
    'jsx-no-bind': 'off',
    'react/jsx-no-bind': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-lonely-if': 'off',
    'import/no-cycle': 'off',
    'react/jsx-tag-spacing': [
      'error',
      {
        beforeSelfClosing: 'always', // Require a space before self-closing tags
      },
    ],
  },
};
