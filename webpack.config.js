const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.js',
    output: {
        filename: isDev ? '[name].js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: './assets/[name].[hash][ext]'
    },
    resolve: {
        extensions: ['.js', '.json','.css', '.scss'],
        alias: {
            Styles: path.resolve(__dirname, 'src/styles/'),
            Assets: path.resolve(__dirname, 'src/assets/')
        }
    },
    devServer: {
        port: 9000,
        client: {
            logging: 'info',
            progress: true,
        }
    },
    optimization: {
        minimize: !isDev,
        minimizer: [
            new TerserPlugin(), 
            new CssMinimizerPlugin()
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    isDev ? 'style-loader':MiniCssExtractPlugin.loader,
                    'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isDev ? 'style-loader':MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/i,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Italian Cuisine',
            template: './src/index.html',
            favicon: './src/favicon.png',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new ESLintPlugin(),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css'
        })
    ]

}