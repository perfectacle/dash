'use strict';
export default class AjaxUtil {
  static dataFetch(url, method='get', headers=null, body=null) {
    return fetch(url, {
      method, headers, body: body && JSON.stringify(body)
    }).then(res => res.json());
  }

  static chkToken(isLoginPage) {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || ''
    };
    const body = {isLoginPage};
    return this.dataFetch('/api/auth/check', 'post', headers, body).then(({success} = data) => {
      return success;
    });
  }
}