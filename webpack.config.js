const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: { main: "./script/index.js" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                //loader: "babel-loader",
                exclude: "/node_modules/",
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.(png|svg|jpg|gif|woff2)$/,
                loader: "file-loader",
            },

            {
                test: /\.html$/,
                loader: "html-loader",
            },

            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
};
