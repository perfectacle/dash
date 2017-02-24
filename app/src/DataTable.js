'use strict';
import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import AjaxUtil from './AjaxUtil';
import Spinner from './Spinner';

export default class DataTable extends Component {
  constructor() {
    super();
    this.state = { // ajax용 mock 스테이트
      data: null
    };
  }

  componentDidMount() {
    AjaxUtil.chkToken(false).then(success => {
      if(!success) return hashHistory.push('/');
      this.setState({
        data: 'Yeah!'
      });
    });
  }

  render() {
    const logout = () => {
      localStorage.removeItem('token');
      hashHistory.push('/');
    };
    if(this.state.data) {
      return (
        <div>
          <h1>난 로그인해야지만 볼 수 있다능!!</h1>
          <button className="btn btn-block" onClick={logout}>로그아웃</button>
        </div>
      );
    }
    return(<Spinner/>);
  }
}