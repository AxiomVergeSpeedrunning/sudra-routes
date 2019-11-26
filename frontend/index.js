const ParcelProxyServer = require('parcel-proxy-server');
const Path = require('path');

// This file is strictly the development entrypoint,
//   so we use container-relative routing
const server = new ParcelProxyServer({
  entryPoint: './public/index.html',
  parcelOptions: {
    hmrPort: 3003,
  },
  proxies: {
    '/api': {
      target: 'http://backend:3001/',
    },
    '/tracker': {
      target: 'http://backend:3001',
    },
  },
});

server.listen(3000, () => {
  console.log('Parcel proxy server has started!');
});
