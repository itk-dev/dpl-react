const path = require("path");

const customWebpack = require("../webpack.config.js");

// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = async ({ config }) => {
  const custom = customWebpack(undefined, { mode: "development" });

  const rules = [
    ...custom.module.rules,
    // The css loader is only used as a temporary solution
    // for loading in the dpl.css file in preview.js
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
      include: path.resolve(__dirname, "../")
    },
    // We need to make use of css modules in our stories.
    {
      test: /\.scss$/,
      use: ["style-loader", "postcss-loader"],
      include: path.resolve(__dirname, "../")
    }
  ];
  const plugins = [...config.plugins];
  return { ...config, plugins, module: { ...config.module, rules } };
};
