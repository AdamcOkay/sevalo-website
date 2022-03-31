const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Если в package.json не задан мод, мод автоматически переключается на разработку
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

// HMR fix
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

const pages = ["catalog", "product", "basket", "success"];

// Удаляем хэш, при билде в разработке
const fileName = (ext) =>
  mode === "development" ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  mode: mode,
  target: target,

  plugins: [
    // Вытаскиваем css в отдельные файлы
    new MiniCssExtractPlugin({
      filename: `css/${fileName("css")}`,
    }),

    // Чистим папку dist
    new CleanWebpackPlugin(),

    // HTML шаблон для основной страницы, где находятся ссылки на все другие
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/index.html`,
      filename: `index.html`,
      chunks: ["index", "vendors", "runtime"],
    }),

    // Шаблоны страниц из массива
    ...pages.map((page) => {
      return new HtmlWebpackPlugin({
        template: `./src/pages/${page}.html`,
        filename: `pages/${page}.html`,
      });
    }),
  ],

  // Точки входа.
  entry: {
    index: "./src/js/main.js",
  },

  output: {
    filename: `js/${fileName("js")}`,
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",

    // Разделяем ассеты по папкам при билде
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
      return `${filepath}/[name][ext][query]`;
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "/" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|webp|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  devtool: mode === "production" ? false : "source-map",

  devServer: {
    port: 8081,
    client: {
      overlay: true,
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
    watchFiles: ["src/**/*.html"],
    hot: true,
  },

  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => {
        const TerserPlugin = require("terser-webpack-plugin");
        new TerserPlugin({
          terserOptions: {
            compress: {},
          },
        }).apply(compiler);
      },
    ],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
