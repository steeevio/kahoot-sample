const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// Webpack uses this to work with directories
const path = require('path')
const fs = require('fs')
// App directory
const appDirectory = fs.realpathSync(process.cwd())

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {

  // Path to your entry point. From this file Webpack will begin its work
  entry: './assets/js/main.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    // Serve index.html as the base
    static: appDirectory,
    // Enable compression
    compress: true,
    // Enable hot reloading
    hot: true,
    historyApiFallback: true

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,
        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders, we use a plugin to do its work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: 'css-loader'
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: 'postcss-loader'
          },
          {
            // SASS to standard CSS
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        // rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [

    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets/images/', to: 'assets/images' },
        { from: 'index.html', to: 'index.html' }
      ]
    })
  ],
  mode: 'development'
}
