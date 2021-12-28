const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
    source:  path.join(__dirname, '/src/'),
    dist:  path.join(__dirname, '/dist/'),
    website: path.join(__dirname, '/src/pages/Website/'),
    uikit: path.join(__dirname, '/src/pages/UIKit/')
}

//TODO: Исправить кавычки

module.exports = {
    mode: "development",
    entry: {
        "form-elements":  PATHS.uikit + '/form-elements/form-elements.js',
        index: PATHS.website + '/index/index.js',
        registration: PATHS.website + '/registration/registration.js',
        "room-info": PATHS.website + '/room-info/room-info.js',
        "rooms-list": PATHS.website + '/rooms-list/rooms-list.js'
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
                use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader", "sass-loader"]
            },
            // {
            //     test: /\.(ttf|woff|woff2|svg)$/,
            //     use: [
            //             {
            //                 loader: "file-loader",
            //                 options: {
            //                     name: '[name].[ext]',
            //                     outputPath: 'fonts/'
            //                 }
            //             }
            //         ]
            // }
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
                filename: 'rooms-list/rooms-list.html',
                chunks: ['rooms-list'],
                template: PATHS.website + 'rooms-list/rooms-list.pug'
            }),
        new HtmlWebpackPlugin(
            {
                filename: 'room-info/room-info.html',
                chunks: ['room-info'],
                template: PATHS.website + 'room-info/room-info.pug'
            }),
        new HtmlWebpackPlugin(
            {
                filename: 'registration/registration.html',
                chunks: ['registration'],
                template: PATHS.website + 'registration/registration.pug'
            }),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css'
        })
    ]
}