module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'jsx-a11y'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 1,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-inferrable-types': [
      'warn',
      {
        ignoreParameters: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
