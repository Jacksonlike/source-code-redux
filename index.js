require('@babel/register')({
  plugins: ['@babel/plugin-transform-modules-commonjs']
})

module.exports = require(`./demo-${process.argv[2]}`)
