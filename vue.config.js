module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      // 本身发的请求 http://localhost:8080/api/product/getBaseCategoryList
      // 代理会把服务器地址改为真实的目标地址http://39.98.123.211/api/product/getBaseCategoryList
      "/api": {
        target: "http://39.98.123.211",
        // pathRewrite: {"^/api" : ""}
        changeOrigin: true,
      },
    },
  },
};
