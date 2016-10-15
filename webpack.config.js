var webpack = require('webpack');
var bower_dir = __dirname + '/bower_components';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//auto join js to html
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: `${__dirname}/assets/index.html`,
//   filename: 'index.html',
//   inject: 'head',
// });

var config = {
   addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^' + name + '$'));
  },
  entry: {
    main: ['./app/main.jsx']
  },
  resolve: { alias: {} },
  output: {
    path: './assets',
    filename: 'js/main.js'
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        // loader: 'style!css'
      },
      {
        test: /\.sass$/,
        loader : ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?includePaths[]=' 
      + __dirname, './node_modules/compass-mixins/lib')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/plugin.js'),
    // HTMLWebpackPluginConfig //auto join js
  ]
};

config.addVendor('react', bower_dir + '/react/react.min.js');
config.addVendor('react-dom', bower_dir + '/react/react-dom.min.js');
config.addVendor('vue', bower_dir + '/vue/dist/vue.min.js');
config.addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('jquery-ui', bower_dir + '/jquery-ui/jquery.ui.min.js');

module.exports = config;
