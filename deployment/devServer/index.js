import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import cors from 'cors';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.dev';
import graphQLHandler from '../../backend/lib/graphql';

const APP_PORT = 3000;
const app = express();
const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  silent: true,
  stats: 'errors-only',
});

app.use(cors())
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

app.post('/graphql', (req, res) => {
  graphQLHandler(req.body.query, req.body.variables)
    .then(result => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result, null, 2));
    })
    .catch(err => res.end(err));
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
// TODO: add favicon.ico
// app.use(favicon(path.resolve(process.cwd(), 'frontend/favicon.ico')));

app.get('*', (req, res) => {
  const indexFilePath = path.join(compiler.outputPath, 'index.html');
  middleware.fileSystem.readFile(indexFilePath, (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

app.listen(APP_PORT, (err) => {
  if (err) console.log(err);
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
