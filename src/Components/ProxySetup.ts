const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app: any) => {
  app.use('/ws', createProxyMiddleware({target: 'URL', ws: true}));
};
