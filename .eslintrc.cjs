module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/no-unused-vars': 'error',
    'vue/multi-word-component-names': ['off'],
  },
};
