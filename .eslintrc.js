module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  globals: {
    getApp: 'readonly',
    wx: 'readonly',
    uni: 'readonly'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'no-tabs': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
