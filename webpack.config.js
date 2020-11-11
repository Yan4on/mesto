const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssUrlRelativePlugin = require("css-url-relative-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/script/index.js"),
    },

    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack Boilerplate",
            template: path.resolve(__dirname, "./src/index.html"), // шаблон
            filename: "index.html", // название выходного файла
        }),
        new CleanWebpackPlugin(),
        new CssUrlRelativePlugin(),
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,

                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[folder]/[name].[ext]",
                        },
                    },
                ],
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
            },

            {
                test: /\.(scss|css)$/,
                use: [
                    /*{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, "./src/style/index.css"),
                        },
                    },*/
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                ],
            },
        ],
    },
};
