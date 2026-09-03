const path = require("path");
const outputDir = path.resolve(__dirname, "dist");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  performance: {
    hints: false,
  },
  output: {
    path: outputDir,
    filename: "scripts.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    usedExports: true,
  },
};
