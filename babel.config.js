module.exports = {
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  env: {
    Dev: {
      presets: [
        ['@vue/app', {
          polyfills: [
            'es6.array.find',
            'es6.array.from',
            'es6.symbol'
          ]
        }]
      ]
    },
    test: {
      presets: [
        ["env", { "targets": { "node": "current" } }]
      ]
    }
  }
}
