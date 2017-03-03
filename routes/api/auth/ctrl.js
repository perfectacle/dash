'use strict';
const fs  = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../../../config');

const secret = config.key;

exports.login = (req, res) => {
  const {id, pw} = req.body;

  if(!config.users[id] || pw !== config.users[id].pw) {
    return res.status(403).json({
      message: !config.users[id] ? '아이디를 확인해주세요!' : '비밀번호를 확인해주세요!',
      dom: !config.users[id] ? 'id' : 'pw'
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
  const {'x-access-token': token} = req.headers;
  const {isLoginPage} = req.body;

  // token does not exist
  if(!token) {
    if(isLoginPage) return res.json({success: true});
    return res.status(401).json({success: false});
  }

  jwt.verify(token, secret, (err) => {
    if(err) {
      if(isLoginPage) return res.json({success: true});
      return res.status(401).json({success: false});
    }
    if(isLoginPage) return res.status(401).json({success: false});
    res.json({success: true});
  });
};