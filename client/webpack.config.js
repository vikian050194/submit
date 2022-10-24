const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildFolderName = "public";

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.jsx"],
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
                test: /\.(jpg|jpeg|gif|png|ico|svg)$/,
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
        path: path.resolve(__dirname, buildFolderName),
        publicPath: "/"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/index.html" },
                { from: "src/favicon.svg" }
            ]
        })
    ],
    devServer: {
        index: path.resolve(__dirname, buildFolderName, "index.html"),
        contentBase: path.resolve(__dirname, buildFolderName),
        publicPath: "/",
        port: 8000,
        watchContentBase: false,
        open: false,
        inline: true,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                pathRewrite: {"^/api" : ""}
            }
        }
    }
};