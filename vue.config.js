module.exports = {
  // devServer: {
  //   proxy: "http://192.168.1.105:2024/api"
  // },
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  outputDir: 'gismaps-nova'
};
