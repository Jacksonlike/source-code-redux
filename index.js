require('@babel/register')({
  plugins: ['@babel/plugin-transform-modules-commonjs']
})

module.exports = require(`./demo/demo-${process.argv[2]}`)
