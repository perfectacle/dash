'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

if(process.env.NODE_ENV !== 'production') { // HTML 핫리로드
  require('./index.html');
}
import './style.css';
import './spinner.css';
import Login from './Login';
import DataTable from './DataTable';

render(
  <Router history={hashHistory}>
    <Route path="/" component={Login} />
    <Route path="/user" component={DataTable} />
  </Router>
  ,document.getElementById('app')
);