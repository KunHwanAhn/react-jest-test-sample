module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    'max-len': ['error', { code: 150 }],
    'import/extensions': ['error', {
      ts: 'never',
      tsx: 'never',
      json: 'always',
      scss: 'always',
    }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'react'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
      ],
      rules: {
        'max-len': ['error', { code: 150 }],
        'import/extensions': ['error', {
          ts: 'never',
          tsx: 'never',
          json: 'always',
          scss: 'always',
        }],
      },
    },
  ],
};
