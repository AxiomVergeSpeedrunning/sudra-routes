module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'prettier'],
  env: {
    browser: true,
  },
  rules: {
    // for...of loops being forbidden is the dumbest thing I have ever heard
    'no-restricted-syntax': ['off'],

    // It's not the 1980's anymore, we can go above 80-100 chars.
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
      },
    ],

    // For components that appear more than once, this is impossible
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],

    // I disagree with this, for this kind of data
    'react/no-array-index-key': ['off'],

    // We want to be able to use middleware
    'no-param-reassign': ['error', { props: false }],

    // This is factually incorrect, JSX belongs in .jsx files
    'react/jsx-filename-extension': ['off'],
    'prettier/prettier': 'error',
  },
};
