const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class", // This can be 'media' if preferred.
  purge: ["./src/**/*.svelte", "./src/**/*.html", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        svelte: "#ff3e00",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const themeColors = theme("colors");
      const individualBorderColors = Object.keys(themeColors).flatMap(
        (colorName) => {
          const themeColor = themeColors[colorName];
          if (typeof themeColor === "object") {
            return Object.entries(themeColor).map(
              ([colorVariant, colorValue]) => ({
                [`.border-b-${colorName}-${colorVariant}`]: {
                  borderBottomColor: colorValue,
                },
                [`.border-t-${colorName}-${colorVariant}`]: {
                  borderTopColor: colorValue,
                },
                [`.border-l-${colorName}-${colorVariant}`]: {
                  borderLeftColor: colorValue,
                },
                [`.border-r-${colorName}-${colorVariant}`]: {
                  borderRightColor: colorValue,
                },
              })
            );
          } else {
            return [
              {
                [`.border-b-${colorName}`]: {
                  borderBottomColor: themeColor,
                },
                [`.border-t-${colorName}`]: {
                  borderTopColor: themeColor,
                },
                [`.border-l-${colorName}`]: {
                  borderLeftColor: themeColor,
                },
                [`.border-r-${colorName}`]: {
                  borderRightColor: themeColor,
                },
              },
            ];
          }
        }
      );

      addUtilities(individualBorderColors);
    }),
  ],
};
