import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    res.status(400).send('Send a URL to proxy, like ?url=https://example.com');
    return;
  }

  const proxy = createProxyMiddleware({
    target: url,
    changeOrigin: true,
    pathRewrite: { '^/api/proxy': '' },
  });

  return proxy(req, res, (err) => {
    if (err) res.status(500).send('Proxy error');
  });
}
