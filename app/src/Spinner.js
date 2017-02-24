'use strict';
import React, {Component} from 'react';

export default class Spinner extends Component {
  render() {
    return(
    <div className="outer">
      <div className="middle">
        <div className="inner spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </div>
    </div>
    );
  }
}