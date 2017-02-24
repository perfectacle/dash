'use strict';
import React, {Component} from 'react';

export default class Login extends Component {
  render() {
    const getVal = (e) => {
      alert(this.id.value);
      alert(this.pw.value);
      e.preventDefault();
    };
    return(
      <div className="container">
        <div id="loginbox" style={{marginTop: '50px'}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="panel-title">로그인</div>
            </div>

            <div style={{paddingTop: '30px'}} className="panel-body">

              <div style={{display:'none'}} id="login-alert" className="alert alert-danger col-sm-12"></div>

              <form id="loginform" className="form-horizontal" role="form" onSubmit={getVal}>
                <div style={{marginBottom: '25px'}} className="input-group">
                  <span className="input-group-addon">
                    <label htmlFor="id"><i className="fa fa-user" aria-hidden="true" /></label>
                  </span>
                  <input id="id" type="text" className="form-control" name="username"
                         placeholder="username or email"
                         ref={ref => this.id = ref}
                  />
                </div>

                <div style={{marginBottom: '25px'}} className="input-group">
                  <span className="input-group-addon">
                    <label htmlFor="pw"><i className="fa fa-key" aria-hidden="true" /></label>
                  </span>
                  <input id="pw" type="password" className="form-control" name="password" placeholder="password"
                         ref={ref => this.pw = ref}
                  />
                </div>


                <div style={{marginTop: '10px'}} className="form-group">
                  <div className="col-sm-12 controls text-center">
                    <input type="submit" value="Login" className="btn btn-success" />
                  </div>
                </div>
              </form>


            </div>
          </div>
        </div>
      </div>
    );
  }
}