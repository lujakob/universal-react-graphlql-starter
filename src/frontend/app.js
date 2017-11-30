import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { getHttpLink } from '../links'

// import './style/index.css';

import Layout from './pages/Layout';

let PORT = 3000;

if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10);
}

const API_HOST =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:' + PORT
    : 'https://api.githunt.com';

const client = new ApolloClient({
  link: getHttpLink(API_HOST),
  cache: new InMemoryCache()
})

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('content')
);
