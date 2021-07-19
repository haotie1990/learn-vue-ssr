const path = require('path');
const fs = require('fs');
const Vue = require('vue');
const VueServerRenderer = require('vue-server-renderer');
const express = require('express');
const compression = require('compression');

const resolve = (file) => path.resolve(__dirname, file);
const isProduction = process.env.NODE_ENV === 'production';
const serverInfo = `express/${require('express/package.json').version} vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const template = fs.readFileSync(resolve('./index.template.html'), 'utf8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const app = express();

// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const renderer = VueServerRenderer.createBundleRenderer(serverBundle, {
  basedir: resolve('./dist'),
  // * https://ssr.vuejs.org/zh/api/#runinnewcontext
  runInNewContext: false,
  // * https://ssr.vuejs.org/zh/api/#template
  template,
  // * https://ssr.vuejs.org/zh/api/#clientmanifest
  clientManifest
});

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProduction ? 1000 * 60 * 60 * 24 : 0
});

app.use(compression({ threshold: 0 }));
app.use('/dist', serve('./dist', false));
app.use('/public', serve('./public', false));
app.get('*', (req, res) => {
  const context = { url: req.url };
  // 注意使用bundle renderer并不需要传入Vue实例
  // 因为在构建bundle的过程中已经自动创建过了
  // 现在我们的服务器服务Node.js与应用程序Vue App已经解耦
  // 注意bundle renderer在调用renderToString时，将自动执行创建Vue实例，并传入渲染上线文
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).send(err.message);
      } else {
        res.status(500).send(err.message);
      }
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', serverInfo);
    res.send(html);
  });
});

app.listen(3000, (err) => {
  if (err) {
    process.exit(-1);
  }
  console.log('listen port: 3000');
});