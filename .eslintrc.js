module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-this-alias": ["error", { allowedNames: ["user"] }],
  },
};
