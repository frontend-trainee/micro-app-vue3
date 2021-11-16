// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require("./package");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_PUBLIC_PATH
      : "/",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
