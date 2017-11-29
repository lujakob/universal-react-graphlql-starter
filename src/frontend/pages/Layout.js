import React from 'react';
import Navbar from '../components/Navbar';
import { Route, Switch } from 'react-router';
import PostsPage from './PostsPage'
import AboutPage from './AboutPage'

const Layout = () => (
  <div>
    <Navbar/>
    <div className="container">
      <Switch>
        <Route path="/posts" component={PostsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="*" component={PostsPage} />
      </Switch>
    </div>
  </div>
);

export default Layout;
