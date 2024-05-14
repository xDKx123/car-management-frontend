const path = require ('path')
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const MiniCssPlugin = require ('mini-css-extract-plugin')
const webpack = require ('webpack')
const dotenv = require ('dotenv')
const ForkTsCheckerWebpackPlugin = require ('fork-ts-checker-webpack-plugin');

dotenv.config ()

const BUILD_DIR = path.resolve (__dirname, './build')
//const DIST_DIR = path.resolve (__dirname, './dist')
const SRC_DIR = path.resolve (__dirname, './src')
const PUBLIC_DIR = path.resolve (__dirname, './public')

module.exports = {
    mode: 'production',
    entry: [
        SRC_DIR
    ],
    output: {
        path: BUILD_DIR,
        filename: '[name].[contenthash].js',
        //filename: '[name].[contenthash].js',
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                include: SRC_DIR,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }]
            },
            {
                test: /\.json$/,
                include: SRC_DIR,
                type: 'javascript/auto',
                use: [{
                    loader: 'json-loader',
                }]

            },
            {
                test: /\.(s*)css$/,
                use: [MiniCssPlugin.loader, 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|pdf)$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new MiniCssPlugin ({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin ({
            title: 'Alarm',
            template: PUBLIC_DIR + '/index.html',
            //filename: 'index.html',
            //inject: 'body',
            //hash: true,
            pageHeader: 'This page header came from webpack.config.js',
            //chunks: ['app'] // must match with entry within entry
        }),
        new webpack.DefinePlugin ({
            'process.env': JSON.stringify (process.env)
        }),
        new ForkTsCheckerWebpackPlugin (),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    watchOptions: {
        ignored: /node_modules/,
     },
    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
            },
        },
        runtimeChunk: 'single'
    }
}