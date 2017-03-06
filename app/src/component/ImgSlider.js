'use strict';
import React, {Component} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClassNames from 'classnames';
import '../styles/ImgSlider.css';

export default class ImgSlider extends Component {
  constructor() {
    super();
    this.state = {
      tt: false
    };
  }

  test() {
    this.setState({
      tt: false
    });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const imgs = this.props.imgs ? this.props.imgs.map((v, i, arr) => (
      <div key={i} className="text-center">
        <img src={v} height="300"/>
        <button className="transBtn" onClick={this.props.hideImgs}>
          <i className="fa fa-times-circle" aria-hidden="true" />
        </button>
      </div>
      )) : '';

    const customSet = {
      isPopup: true
    };

    const {isVisible} = this.props;
    return (
      <div className={
        ClassNames({
          'slider-popup-container': customSet.isPopup,
          'vertical-container': customSet.isPopup,
          hidden: !isVisible
        })
      }>
        <Slider {...settings} className={customSet ? 'vertical-content' : ''}>
          {imgs || <div></div>}
        </Slider>
      </div>
    );
  }
}