import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import './style/index.css';

import Layout from './pages/Layout';

render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
  document.getElementById('content')
);
