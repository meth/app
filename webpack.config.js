const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HappyPack = require('happypack')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const ifDev = (env, plugin) => (env.development === true ? plugin : () => undefined)
const ifTest = (env, plugin) => (env.test === true ? plugin : () => undefined)
const ifProd = (env, plugin) => (env.production === true ? plugin : () => undefined)
// we use JSON.stringify for env strings as webpack will think it is a code fragment otherwise

const vendorBuildFolder = path.join(__dirname, 'build', 'vendor')
const productionBuildFolder = path.join(__dirname, 'build', 'web')

const plugins = (env) => [
  ifDev(env, new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    '__DEV__': env.development === true,
  })),
  ifTest(env, new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__DEV__': env.development === true,
  })),
  ifProd(env, new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__DEV__': env.development === true,
  })),
  new HappyPack({
    loaders: ['babel-loader'],
  }),
  ifDev(env, new webpack.HotModuleReplacementPlugin()),
  ifDev(env, new webpack.NamedModulesPlugin()),
  ifProd(env, new LodashModuleReplacementPlugin()),
  ifProd(env, new webpack.optimize.ModuleConcatenationPlugin()),
  ifProd(env, new webpack.optimize.AggressiveMergingPlugin()),
  ifProd(env, new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: {
      warnings: false, // Suppress uglification warnings
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
    },
    output: {
      comments: false,
    },
    sourceMap: false,
    exclude: [/\.min\.js$/gi], // skip pre-minified libs
  })),
]

const loaders = (env) => ([
  {
    test: /\.ttf$/,
    loader: 'url-loader',
    include: path.resolve(__dirname, '../node_modules/react-native-vector-icons'),
  },
  {
    // Many react-native libraries do not compile their ES6 JS.
    test: /\.js$/,
    include: /node_modules\/react-native-/,
    // react-native-web is already compiled.
    exclude: /node_modules\/react-native-web\//,
    loader: 'happypack/loader',
    query: { cacheDirectory: true },
  },
  {
    test: /\.(gif|jpe?g|png|svg)$/,
    loader: 'url-loader',
    query: { name: 'images/[name]-[hash:16].[ext]' },
  },
  {
    test: /\.(mp3|wav)$/,
    loader: 'file-loader',
    query: { name: 'sounds/[name]-[hash:16].[ext]' },
  },
])

const resolve = {
  alias: {
    'react-native': 'react-native-web',
    // 'react-navigation': 'react-navigation/lib/react-navigation.js',
  },
  extensions: [
    '.web.js',
    '.js',
    '.json'
  ]
}

const VendorConfig = (env) => ({
  entry: {
    // Note: you can't have inter-dependencies between these dlls otherwise they break
    // Put react-native-web / react dependencies in here.
    'react': [
      'react-native-web',
      'react-navigation',
    ],
    // Put any other other core libs in here. (immutable, redux, localforage, etc.)
    'core': [
      'bluebird',
      'immutable',
      'immutable-state-machine',
      'i21n',
      'lodash',
    ],
  },
  output: {
    path: vendorBuildFolder,
    filename: '[name]-[hash:16].dll.js',
    library: '[name]',
  },
  module: {
    noParse: /localforage\/dist\/localforage.js/,
    loaders: loaders(env),
  },
  plugins: [
    new CleanWebpackPlugin([
      vendorBuildFolder
    ], {
      root: __dirname,
      verbose: true
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    ...plugins(env),

    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(vendorBuildFolder, '[name]-manifest.json'),
    }),
  ],
  resolve: resolve,
})

const addAssetHtmlFiles = (env) => {
  return Object.keys(VendorConfig(env).entry).map((name) => {
    const fileGlob = `${name}*.dll.js`
    const paths = glob.sync(path.join(VendorConfig(env).output.path, fileGlob))
    if (paths.length === 0) throw new Error(`Could not find ${fileGlob}!`)
    if (paths.length > 1) throw new Error(`Too many files for ${fileGlob}! You should clean and rebuild.`)
    return {
      filepath: require.resolve(paths[0]),
      includeSourcemap: false,
      outputPath: 'js/vendor',
      publicPath: '/js/vendor',
    }
  })
}

const BuildConfig = (env = { development: false }) => ({
  devServer: {
    contentBase: productionBuildFolder,
    // enable HMR
    hot: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: 3000,
  },
  devtool: env.development ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: {
    app: env.development ? [
      'react-hot-loader/patch',
      path.join(__dirname, 'index.web.js'),
    ] : [
      path.join(__dirname, 'index.web.js')
    ],
  },
  module: {
    loaders: [
      ...loaders(env),
      {
        test: /\.(js)$/,
        loader: 'happypack/loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'index.web.js'),
          path.resolve(__dirname, 'src'),
          // path.resolve(__dirname, '../node_modules/react-native-vector-icons'),
        ],
        query: { cacheDirectory: true },
      },
    ]
  },
  output: {
    path: productionBuildFolder,
    filename: 'js/[name]-[hash:16].js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin([productionBuildFolder], { root: __dirname, verbose: true }),
    ...Object.keys(VendorConfig(env).entry).map(name =>
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.join(VendorConfig(env).output.path, `${name}-manifest.json`)),
      })),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin({
      // '__OFFLINE__': env.development !== true,
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
    }),
    new AddAssetHtmlPlugin(addAssetHtmlFiles(env)),
    ...plugins(env),
  ],
  resolve: resolve,
})

module.exports = (env = { development: false, vendor: false }) => {
  return (env.vendor ? VendorConfig(env) : BuildConfig(env))
}
