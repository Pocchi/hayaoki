module.exports = {
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    './node_modules/prettier-stylelint/config.js',
  ],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    indentation: 2,
    'string-quotes': 'single',
    'order/properties-alphabetical-order': true,
    'scss/at-rule-no-unknown': true,
    'at-rule-no-unknown': null,
  },
};
