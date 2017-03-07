'use strict';
import React, {Component} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClassNames from 'classnames';
import '../styles/ImgSlider.scss';

export default class ImgSlider extends Component {
  componentDidUpdate() {
    this.slider.focus();
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const imgs = this.props.imgs ? this.props.imgs.map((v, i, arr) => (
      <div key={i} className="text-center">
        <img src={v} />
        <button className="transBtn" style={{padding: 0, marginLeft: '5px'}}>
          <i className="fa fa-times-circle fa-3x" aria-hidden="true" />
        </button>
      </div>
      )) : '';

    const customSet = {
      isPopup: true
    };

    const {isVisible, hideImgs} = this.props;
    if(customSet) return(
      <div className={
        ClassNames('slider-popup outer', {
          hidden: !isVisible
        })}
           onKeyDown={hideImgs} onClick={hideImgs}
           tabIndex="-1" ref={ref => this.slider=ref}>
        <div className="middle">
          <div className="slider-popup inner">
            <Slider {...settings}>
              {imgs || <div></div>}
            </Slider>
          </div>
        </div>
      </div>
    );
    return (
      <Slider {...settings}>
        {imgs || <div></div>}
      </Slider>
    );
  }
}