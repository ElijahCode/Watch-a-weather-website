module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jest"],
  rules: {
    "import/prefer-default-export": "off",
    "no-console": "off",
    "func-names": "off",
  },
};
