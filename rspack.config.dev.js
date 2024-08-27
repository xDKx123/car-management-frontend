const path = require('path')
const HtmlWebpackPlugin = require ('html-webpack-plugin')
//const MiniCssPlugin = require ('mini-css-extract-plugin')
const rspack = require('@rspack/core');
const dotenv = require ('dotenv')
const ForkTsCheckerWebpackPlugin = require ('fork-ts-checker-webpack-plugin');
const { experiments } = require('webpack');

dotenv.config({
})

//const BUILD_DIR = path.resolve (__dirname, './build')
const DIST_DIR = path.resolve (__dirname, './dist')
const SRC_DIR = path.resolve (__dirname, './src')
const PUBLIC_DIR = path.resolve (__dirname, './public')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    /*entry: {
     app: SRC_DIR + '/index.tsx',
     main: ['webpack-hot-middleware/client', SRC_DIR + '/index.tsx']
     }*/
    entry: [
        SRC_DIR
    ],
    devServer: {
        server: 'http',
        host: 'localhost',
        static: [
            {
                directory: PUBLIC_DIR
            },
            {
                directory: DIST_DIR
            }
        ],
        historyApiFallback: true,
        hot: true,
        port: 3000,
        open: true,
        compress: true,
        /*proxy: [
            {
                context: ['/api'],
                target: 'http://backend:8000',
                secure: false,
                pathRewrite: {'^/api': ''},
                changeOrigin: true,
            }
        ]*/
    },
    output: {
        path: DIST_DIR,
        filename: '[name].[contenthash].js',
        //filename: '[name].[contenthash].js',
        clean: true,
        publicPath: '/',
    },
    experiments: {
        css: false,
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
                include: SRC_DIR,
                use: [rspack.CssExtractRspackPlugin.loader, 'css-loader', 'sass-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                'tailwindcss',
                            ]
                        }
                    }
                }]
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
        new HtmlWebpackPlugin ({
            title: 'Diplomska',
            template: PUBLIC_DIR + '/index.html',
            //filename: 'index.html',
            //inject: 'body',
            //hash: true,
            pageHeader: 'This page header came from rspack.config.js',
            //chunks: ['app'] // must match with entry within entry
        }),

        new rspack.DefinePlugin ({
            'process.env': JSON.stringify (process.env)
        }),
        new ForkTsCheckerWebpackPlugin ({
            async: true,
            typescript: {
                configFile: path.resolve (__dirname, 'tsconfig.json'),
                memoryLimit: 4096,
            },
            
    
        }),
        new rspack.CssExtractRspackPlugin({})
    ],
    infrastructureLogging: {
        colors: true,
        level: 'verbose',
    },
}