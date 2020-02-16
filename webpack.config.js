const path = require('path')

module.exports = {
    target: 'electron-main',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'main.js'
    },
    node: {
        __dirname: false
    }
}