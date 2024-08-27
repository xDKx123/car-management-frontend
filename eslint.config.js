module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'es2022',
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'unused-imports',
        'react-hooks'
    ],
    ignorePatterns: [
        'node_modules/',
        'build/',
        'dist/',
        '*/*test.*',
        '*/.d.ts',
        '*/.js',
    ],
    rules: {
        'react/prop-types': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        'unused-imports/no-unused-imports': 'error',
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        "react/jsx-max-props-per-line": ["error", { "maximum": 1, "when": "always" }],
        indent: [
            'error',
            4
        ],
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ],
        eqeqeq: 'error',
        'no-debugger': 'off',
        'no-restricted-imports': [
            'error',
            {
                'patterns': ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*']
            }
        ],
        'react-hooks/rules-of-hooks': 'warn', // Checks rules.ts of Hooks
        'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
    },
    "overrides": [
        {
            "files": ["src/tests/**/*"],
            "env": {
                "jest": true
            }
        }
    ]
}