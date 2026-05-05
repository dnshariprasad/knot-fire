import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import i18next from 'eslint-plugin-i18next'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'i18next': i18next,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'i18next/no-literal-string': ['error', {
        'markup-only': true,
        'ignoreAttribute': ['style', 'className', 'id', 'layoutId', 'initial', 'animate', 'exit', 'transition', 'variants', 'whileHover', 'whileTap', 'side', 'align', 'sideOffset'],
      }],
      'no-restricted-imports': ['error', {
        'patterns': [{
          'group': ['**/*.css'],
          'message': 'Please use styled-components instead of CSS files.'
        }]
      }],
    },
  },
)
