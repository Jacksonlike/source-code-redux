require('@babel/register')({
  plugins: ['@babel/plugin-transform-modules-commonjs']
})

module.exports = require(`./demos/demo-${process.argv[2]}`)
