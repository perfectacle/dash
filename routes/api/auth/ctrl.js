'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = (req, res) => {
  const {id, pw} = req.body;
  const secret = req.app.get('jwt-secret');
  const hashPW = crypto.createHmac('sha1', secret).update(pw).digest('base64');

  if(id !== 'admin' || hashPW !== '4ShQxYcmkbhtbq3LcJJtCBTJpmI=') {
    return res.status(403).json({
      message: (id !== 'admin') ? '아이디를 확인해주세요!' : '비밀번호를 확인해주세요!',
      dom: (id !== 'admin') ? 'id' : 'pw'
    });
  }
  res.json({
    token: jwt.sign({id}, secret, {
      expiresIn: '1d',
      issuer: 'yanggs',
      subject: 'userInfo'
    })
  });
};

exports.check = (req, res) => {
  // read the token from header or url
  const {token, isLoginPage} = req.body;

  // token does not exist
  if(!token) {
    if(isLoginPage) return res.json({success: true});
    return res.status(401).json({
      success: false
    });
  }

  jwt.verify(token, req.app.get('jwt-secret'), (err) => {
    if(isLoginPage) return res.json({success: false});
    if(err) {
      return res.status(401).json({
        success: false
      });
    }
    res.json({
      success: true
    });
  });
};