const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
    source:  path.join(__dirname, '/src/'),
    dist:  path.join(__dirname, '/dist/'),
    pages: path.join(__dirname, '/src/Website/pages/'),
    uikit: path.join(__dirname, '/src/UIKit/pages/')
}

//TODO: Исправить кавычки

module.exports = {
    mode: "development",
    entry: {
        formElements:  PATHS.uikit + '/formElements/formElements.js',
        index: PATHS.pages + '/index/index.js',
        registration: PATHS.pages + '/registration/registration.js',
        roomInfo: PATHS.pages + '/roomInfo/roomInfo.js',
        roomsList: PATHS.pages + '/roomsList/roomsList.js'
    },
    output: {
        path: PATHS.dist,
        filename: '[name]/[name].js'
    },
    devServer: {
        static: [{directory: path.join(__dirname, 'dist')}, {directory: path.join(__dirname, 'src')}]
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|svg)$/,
                use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin(
        {
            filename: 'index/index.html',
            chunks: ['index'],
            template: PATHS.pages + 'index/index.pug'
        }),
        new HtmlWebpackPlugin(
            {
                filename: 'formElements/formElements.html',
                chunks: ['formElements'],
                template: PATHS.uikit + '/formElements/formElements.pug'
            }),
        new HtmlWebpackPlugin(
            {
                filename: 'roomsList/roomsList.html',
                chunks: ['roomsList'],
                template: PATHS.pages + 'roomsList/roomsList.pug'
            }),
        new HtmlWebpackPlugin(
            {
                filename: 'roomInfo/roomInfo.html',
                chunks: ['roomInfo'],
                template: PATHS.pages + 'roomInfo/roomInfo.pug'
            }),
        new HtmlWebpackPlugin(
            {
                filename: 'registration/registration.html',
                chunks: ['registration'],
                template: PATHS.pages + 'registration/registration.pug'
            }),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css'
        })
    ]
}