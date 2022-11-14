const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const hbsPages = fs.readdirSync('src').filter(fileName => fileName.endsWith('.hbs')).map(el => el.slice(0, -4));

let mode = 'development';
let target = 'web'; // in dev mode browserslist not using
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist'; // use browserslist
}

module.exports = {
  mode,
  target,
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'webpack/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: false,
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  devServer: {
    port: 5555,
    open: true,
    hot: true,
    watchFiles: [
      `src/**/*.hbs`,
      `src/styles/**/*.scss`
    ],
  },
  plugins: [
    ...hbsPages.map(page => new HtmlWebpackPlugin({
      minify: true,
      filename: `${page}.html`,
      template: path.resolve(__dirname, 'src', `${page}.hbs`),
    })),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new ImageminWebpWebpackPlugin(),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src', 'googlefc1494847b7d68fd.html'),
        to: path.resolve(__dirname, 'dist'),
      }, {
        from: path.resolve(__dirname, 'src', 'vendor'),
        to: path.resolve(__dirname, 'dist', 'vendor'),
      }, ],
    }),
  ],
  module: {
    rules: [{
        test: /\.hbs$/i,
        use: [{
            loader: 'handlebars-loader',
            options: {
              inlineRequires: '\/img\/'
            },
          },
          {
            loader: 'string-replace-loader',
            options: {
              search: '@img',
              replace: path.resolve(__dirname, 'src', `img`),
              flags: 'g'
            }
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'group-css-media-queries-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        use: [{
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            },
          }
        }],
        type: mode === 'production' ? 'asset' : 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // not indexing node_modules
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // Use cache to avoid recompilation on every start
          },
        },
      },
    ]
  },
  resolve: {
    alias: {
      '@img': path.join(__dirname, 'src', 'img'),
      '@src': path.join(__dirname, 'src')
    },
  },
}