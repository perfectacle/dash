'use strict';
import React, {Component} from 'react';
import {browserHistory, hashHistory} from 'react-router';
import AjaxUtil from './AjaxUtil';
import Spinner from './Spinner';
import ReactTable from 'react-table';

const isBrowserHistory = window.history.location || window.location;

export default class DataTable extends Component {
  constructor() {
    super();
    this.state = { // ajax용 mock 스테이트
      isChkToken: false,
      data: null
    };
  }

  componentDidMount() {
    AjaxUtil.chkToken(false).then(success => {
      if(!success) return isBrowserHistory ? browserHistory.push('/') : hashHistory.push('/');
      this.setState({
        isChkToken: true
      });
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
    const columns = [{
      header: '고객 성명',
      accessor: 'name',
      width: 150
    }, {
      header: '고객 성별',
      accessor: 'sex'
    }, {
      header: '휴대폰 번호',
      accessor: 'phone',
      width: 150
    }, {
      header: '이메일',
      accessor: 'email',
      width: 250
    }, {
      header: '주소',
      accessor: 'homeaddress',
      width: 300
    }, {
      header: '고양이/강아지',
      accessor: 'product_pets.kind'
    }, {
      header: '반려동물 이름',
      accessor: 'petName',
      width: 150
    }, {
      header: '반려동물 생년월일',
      accessor: 'petBirth',
      width: 150
    }, {
      header: '반려동물 나이',
      accessor: 'petAge'
    }, {
      header: '반려동물 성별',
      accessor: 'petGender'
    }, {
      header: '보상비율/플랜',
      accessor: 'plan',
      width: 300,
      render: props => <span style={{whiteSpace: 'normal'}}>{props.value}</span> // Custom cell components!
    }, {
      header: '보험료',
      accessor: 'price'
    }, {
      header: '계약일',
      accessor: 'contDate'
    }, {
      header: '사진',
      accessor: 'note',
      width: 300,
      maxWidth: 3000,
      render: props => <span style={{whiteSpace: 'normal'}}>{props.value}</span> // Custom cell components!
    }];
    const logout = () => {
      localStorage.removeItem('token');
      isBrowserHistory ? browserHistory.push('/') : hashHistory.push('/');
    };
    if(this.state.data) {
      return (
        <div>
          <button className="btn btn-block" onClick={logout}>로그아웃</button>
          <ReactTable
            data={this.state.data}
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