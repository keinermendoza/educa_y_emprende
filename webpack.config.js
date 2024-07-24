const path = require('path');

module.exports = {
    entry: {
        index: './src/js/index.js',
        cursos: './src/js/cursos.js',
        editor:'./src/js/editor.js',

        vendor: './src/js/vendor.js',
        // editor_app:'./src/react/editor_app.jsx',
    },
    output: {
        'path': path.resolve('staticfiles', 'js'),
        'filename': '[name].js'
    },

    module: {
        rules: [
            // for procces css
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // for procces images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],

        alias: {
            '@components': path.resolve(__dirname, 'src/chadcn/components/ui/'),
            '@utils': path.resolve(__dirname, 'src/chadcn/lib/utils/')
        }
    }
    
    
}
