'use strict';
import React, {Component} from 'react';
import {browserHistory, hashHistory} from 'react-router';
import AjaxUtil from './AjaxUtil';
import Spinner from './Spinner';

const isBrowserHistory = window.history.location || window.location;

export default class Login extends Component {
  constructor() {
    super();
    this.state = { // ajax용 mock 스테이트
      isChkToken: false
    };
  }

  componentDidMount() {
    AjaxUtil.chkToken(true).then(success => {
      if(!success) return isBrowserHistory ? browserHistory.push('/user') : hashHistory.push('/user');
      this.setState({
        isChkToken: true
      });
    });
  }

  render() {
    if(this.state.isChkToken) {
      const login = (e) => {
        e.preventDefault();
        const headers = {
          'Content-Type': 'application/json'
        };
        const body = {
          id: this.id.value,
          pw: this.pw.value
        };
        AjaxUtil.dataFetch('/api/auth/login', 'post', headers, body)
        .then(({token, message, dom} = data) => {
          if(!token) throw {message, dom};
          localStorage.setItem('token', token);
          isBrowserHistory ? browserHistory.push('/user') : hashHistory.push('/user');
        }).catch(({message, dom}= err) => {
          alert(message);
          this[dom].focus();
        });
      };

      return (
        <div className="container">
          <div id="loginbox" style={{marginTop: '50px'}}
               className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div className="panel panel-info">
              <div className="panel-heading">
                <div className="panel-title">로그인</div>
              </div>

              <div style={{paddingTop: '30px'}} className="panel-body">

                <div style={{display: 'none'}} id="login-alert" className="alert alert-danger col-sm-12"></div>

                <form id="loginform" className="form-horizontal" role="form" onSubmit={login}>
                  <div style={{marginBottom: '25px'}} className="input-group">
                    <span className="input-group-addon">
                      <label htmlFor="id"><i className="fa fa-user" aria-hidden="true"/></label>
                    </span>
                    <input id="id" type="text" className="form-control" name="username"
                           placeholder="username or email"
                           ref={ref => this.id = ref}
                    />
                  </div>

                  <div style={{marginBottom: '25px'}} className="input-group">
                    <span className="input-group-addon">
                      <label htmlFor="pw"><i className="fa fa-key" aria-hidden="true"/></label>
                    </span>
                    <input id="pw" type="password" className="form-control" name="password" placeholder="password"
                           ref={ref => this.pw = ref}
                    />
                  </div>


                  <div style={{marginTop: '10px'}} className="form-group">
                    <div className="col-sm-12 controls text-center">
                      <input type="submit" value="Login" className="btn btn-success"/>
                    </div>
                  </div>
                </form>


              </div>
            </div>
          </div>
        </div>
      );
    }
    return (<Spinner/>);
  }
}