const Vue = require('vue');
const VueServerRenderer = require('vue-server-renderer');
const express = require('express');
const fs = require('fs');
const createVueApp = require('./entry-server');

const app = express();
const renderer = VueServerRenderer.createRenderer({
  template: fs.readFileSync(__dirname + '/index.template.html', 'utf8')
});

app.get('*', (req, res) => {
  const context = { url: req.url };
  createVueApp(context)
    .then(vm => {
      return renderer.renderToStream(vm);
    })
    .then(html => {
      res.status(200).end(html);
    })
    .catch(err => {
      res.status(500).end(err.message);
    });
});

app.listen(3000, (err) => {
  if (err) {
    process.exit(-1);
  }
  console.log('listen port: 3000');
});