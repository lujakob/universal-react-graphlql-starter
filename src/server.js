import Express from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import bodyParser from 'body-parser'
import { ApolloClient } from 'apollo-client';
import { renderToStringWithData } from 'react-apollo'

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import React from 'react';
import ReactDOM from 'react-dom/server';
import ReactDOMServer from 'react-dom/server';

import { StaticRouter } from 'react-router';

import {schema} from './backend/schema'

import Html from './frontend/pages/Html';
import Layout from './frontend/pages/Layout';
import {getHttpLink} from './links'

let PORT = 3000;

if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10);
}

const API_HOST =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:' + PORT
    : 'https://api.githunt.com';

const app = new Express();

if (process.env.NODE_ENV === 'production') {
  // In production we want to serve our JS from a file on the filesystem.
  app.use('/static', Express.static(path.join(process.cwd(), 'build/client')));
} else {
  // Otherwise we want to proxy the webpack development server.
  app.use(
    '/static',
    proxy({ target: 'http://localhost:3020', pathRewrite: { '^/static': '' } })
  );
}

// graphql resource - add request token and user to context
app.post('/graphql', bodyParser.urlencoded({extended: true}), bodyParser.json(), graphqlExpress(() => ({
  schema
})))

// graphiql
app.use('/graphiql', bodyParser.urlencoded({extended: true}), bodyParser.json(), graphiqlExpress({
  endpointURL: '/graphql'
}))

// server side rendering
app.use((req, res) => {

  const client = new ApolloClient({
    ssrMode: true,
    link: getHttpLink(API_HOST),
    cache: new InMemoryCache(),
  });

  const context = {};

  const component = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </ApolloProvider>
  );

  renderToStringWithData(component)
    .then((content) => {

      const initialState = client.cache.extract();
      const html = <Html content={content} state={initialState}/>;

      res.status(200);
      res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
      res.end();
    })
    .catch(e => {
      console.error('RENDERING ERROR:', e);
      res.status(500);
      res.end(
        `An error occurred. \n\n${e.stack}`
      );
    });

});

app.listen(PORT, () =>
console.log(
  // eslint-disable-line no-console
  `App Server is now running on http://localhost:${PORT}`
)
);
