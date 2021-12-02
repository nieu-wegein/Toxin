const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source:  path.join(__dirname, '/src'),
    dist:  path.join(__dirname, '/dist'),
    pages: path.join(__dirname, '/src/pug/pages')
}

module.exports = {
    mode: "development",
    output: {
        path: PATHS.dist,
        filename: 'index.js'
    },

    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
       // chunks: ['index'],
        template: PATHS.pages + '/index/index.pug'
    })],

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
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
}