const path = require("path");
const autoprefixer = require('autoprefixer')
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackSimpleIncludePlugin = require("html-webpack-simple-include-plugin");
module.exports = {
  entry: {
    main: "./src/index.js",
  },
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
    hot: true,
    port:8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" }
      ],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "index2.html",
      template: "src/index2.html",
    }),


    new HtmlWebpackSimpleIncludePlugin([
      {
        tag: '<include-check />',
        content: fs.readFileSync(path.resolve(__dirname, "src/partials/check.html")),
      },
      {
        tag: '<include-test />',
        content: fs.readFileSync(path.resolve(__dirname, "src/partials/test.html")),
      },
    ])
  ],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};

