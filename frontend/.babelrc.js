module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 2,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],

    // This must be after the decorators proposal.
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
  ],
};
