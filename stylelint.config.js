export default {
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  extends: [
    "stylelint-config-standard", // For standard CSS rules
    "stylelint-config-recommended-scss", // For SCSS specific rules
  ],
  plugins: [
    "stylelint-order", // To enforce property order
  ],
  rules: {
    "property-disallowed-list": [
      "font-family", // Disallow font-family property
      "font-size", // Disallow font-size property
      "font-weight", // Disallow font-weight property
    ],
  },
};
