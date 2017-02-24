'use strict';
import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

if(process.env.NODE_ENV !== 'production') { // HTML 핫리로드
  require('./index.html');
}
import './style.css';
import Login from './Login';

render(
  <Login/>, document.getElementById('app')
);