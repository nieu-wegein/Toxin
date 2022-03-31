const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
    source:  path.join(__dirname, '/src/'),
    dist:  path.join(__dirname, '/dist/'),
    website: path.join(__dirname, '/src/pages/Website/'),
    uikit: path.join(__dirname, '/src/pages/UIKit/')
}

module.exports = {
    mode: "development",
    entry: {
        "form-elements": PATHS.uikit + '/form-elements/form-elements.js',
        "cards": PATHS.uikit + '/cards/cards.js',
        "structural-blocks": PATHS.uikit + '/structural-blocks/structural-blocks.js',
        "index": PATHS.website + '/index/index.js',
        "registration-page": PATHS.website + '/registration-page/registration-page.js',
        "sign-in-page": PATHS.website + '/sign-in-page/sign-in-page.js',
        "search-results": PATHS.website + '/search-results/search-results.js',
        "room-details": PATHS.website + '/room-details/room-details.js'
    },
    output: {
        path: PATHS.dist,
        filename: '[name]/[name].js',
        assetModuleFilename: "[name][ext]",
    },
    devServer: {
        static: [{directory: path.join(__dirname, 'dist')}, {directory: path.join(__dirname, 'src')}]
    },

    module: {
        rules: [

            {
              test: /\.pug$/,
              use: ["html-loader", {loader: 'pug-html-loader', options: {exports: false}}]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader", "sass-loader"]
            },
            {
              test: /\.(ttf|woff|woff2|svg)$/,
              type: "asset/resource",
              exclude: [/img/],
              generator: {
                filename: 'fonts/[name][ext]'
              }
            },
            {
              test: /\.(jpeg|jpg|png|svg|gif|ico)$/,
              type: "asset/resource",
              exclude: [/fonts/],
              generator: {
                filename: 'img/[name][ext]'
              }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin(
        {
            filename: 'index/index.html',
            chunks: ['index'],
            template: PATHS.website + 'index/index.pug'
        }),
      new HtmlWebpackPlugin(
        {
            filename: 'form-elements/form-elements.html',
            chunks: ['form-elements'],
            template: PATHS.uikit + '/form-elements/form-elements.pug'
        }),
      new HtmlWebpackPlugin(
        {
          filename: 'cards/cards.html',
          chunks: ['cards'],
          template: PATHS.uikit + '/cards/cards.pug'
        }),
      new HtmlWebpackPlugin(
        {
          filename: 'structural-blocks/structural-blocks.html',
          chunks: ['structural-blocks'],
          template: PATHS.uikit + '/structural-blocks/structural-blocks.pug'
        }),
      new HtmlWebpackPlugin(
          {
              filename: 'search-results/search-results.html',
              chunks: ['search-results'],
              template: PATHS.website + 'search-results/search-results.pug'
          }),
      new HtmlWebpackPlugin(
          {
              filename: 'room-details/room-details.html',
              chunks: ['room-details'],
              template: PATHS.website + 'room-details/room-details.pug'
          }),
      new HtmlWebpackPlugin(
          {
              filename: 'registration-page/registration-page.html',
              chunks: ['registration-page'],
              template: PATHS.website + 'registration-page/registration-page.pug'
          }),
      new HtmlWebpackPlugin(
        {
          filename: 'sign-in-page/sign-in-page.html',
          chunks: ['sign-in-page'],
          template: PATHS.website + 'sign-in-page/sign-in-page.pug'
        }),
      new MiniCssExtractPlugin({
          filename: '[name]/[name].css'
      })
    ]
}