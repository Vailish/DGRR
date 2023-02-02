const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/login',
    createProxyMiddleware({
      target: 'http://192.168.31.134:80',
      pathRewrite: {
        '^/login': ''
      },
      changeOrigin: true
    })
  )
};