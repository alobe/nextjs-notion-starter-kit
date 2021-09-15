module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['next/babel'],
    plugins: process.env.NODE_ENV === "development" ? ['babel-plugin-open-source'] : []
  }
}
