module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname + '/app/public/js/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a valid name to reference
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ["style", "css", "sass"]
        }
      ]
    }
};
