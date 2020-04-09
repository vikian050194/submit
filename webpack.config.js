const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackRootPlugin = require("html-webpack-root-plugin");

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./client/js/index.jsx"],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                resolve: {
                    extensions: [".js", ".jsx"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|ico)$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "server", "public"),
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            "title": "Square",
            "favicon": "client/favicon.png"
        }),
        new HtmlWebpackRootPlugin(),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ]
};