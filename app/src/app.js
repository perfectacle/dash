'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory, hashHistory } from 'react-router';
import 'whatwg-fetch';
import 'babel-polyfill';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


if(process.env.NODE_ENV !== 'production') { // HTML 핫리로드
  require('./index.html');
}
import './styles/common.css';
import Login from './container/Login';
import PetTable from './container/PetTable';

const isBrowserHistory = window.history.location || window.location;

render(
  <Router history={isBrowserHistory ? browserHistory : hashHistory}>
    <Route path="/" component={Login} />
    <Route path="/pet/table" component={PetTable} />
    <Redirect from="*" to="/" />
  </Router>
  ,document.getElementById('app')
);