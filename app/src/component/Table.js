'use strict';
import React, {Component} from 'react';
import {browserHistory, hashHistory} from 'react-router';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../styles/Table.css';

import AjaxUtil from '../lib/AjaxUtil';
import Spinner from '../component/Spinner';

const isBrowserHistory = window.history.location || window.location;

export default class Tables extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    document.title = '고객 정보 보기';
    AjaxUtil.chkToken(false).then(success => {
      if(!success) return isBrowserHistory ? browserHistory.push('/') : hashHistory.push('/');
      const header = {
        'x-access-token': localStorage.getItem('token') || ''
      };
      AjaxUtil.dataFetch('/api/pet', 'get', header)
      .then(data => {
        this.setState({data});
      });
    });
  }

  render() {
    const {data} = this.state;
    const {isTransparent, columns} = this.props;

    const logout = () => {
      localStorage.removeItem('token');
      isBrowserHistory ? browserHistory.push('/') : hashHistory.push('/');
    };

    if(data) {
      return (
        <div className={isTransparent ? 'opacity-higher' : ''}>
          <button className="btn btn-block" onClick={logout}>로그아웃</button>
          <ReactTable
            data={data}
            columns={columns}
            previousText="이전 페이지"
            nextText="다음 페이지"
            loadingText=""
            noDataText="데이터가 없습니다."
            pageText="페이지"
            ofText="/"
            rowsText="개씩 보기"
            showPageSizeOptions={true}
          />
        </div>
      );
    }
    return(<Spinner/>);
  }
}