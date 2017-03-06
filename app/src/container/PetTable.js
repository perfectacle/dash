'use strict';
import React, {Component} from 'react';

import ImgSlider from '../component/ImgSlider';
import Table from '../component/Table';

export default class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
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
          width: 250,
          render: props => <span style={{whiteSpace: 'normal'}}>{props.value}</span> // Custom cell components!
        }, {
          header: '주소',
          accessor: 'homeaddress',
          width: 300,
          render: props => <span style={{whiteSpace: 'normal'}}>{props.value}</span> // Custom cell components!
        }, {
          header: '고양이/강아지',
          accessor: 'pet_kind'
        }, {
          header: '반려동물 이름',
          accessor: 'pet_name',
          width: 150,
          render: props => <span style={{whiteSpace: 'normal'}}>{props.value}</span> // Custom cell components!
        }, {
          header: '반려동물 생년월일',
          accessor: 'pet_birth',
          width: 150
        }, {
          header: '반려동물 나이',
          accessor: 'pet_age'
        }, {
          header: '반려동물 성별',
          accessor: 'pet_sex'
        }, {
          header: '플랜 / 보상비율',
          accessor: 'pet_planNratio',
          width: 120
        }, {
          header: '보험료',
          accessor: 'pet_cost'
        }, {
          header: '계약일',
          accessor: 'pay_paidDate'
        }, {
          header: '결제 형태',
          accessor: 'pay_type'
        }, {
          header: '결제 상태',
          accessor: 'pay_status'
        }, {
          header: '사진',
          accessor: 'images_pet',
          render: props => (
            <button className="transBtn" onClick={() => this.showImgs(props.value)}>
              <i className="fa fa-picture-o" aria-hidden="true" />
            </button>
          )
        }
      ],
      isImgsVisible: false,
      imgs: null
    };
  }

  showImgs(imgs) {
    this.setState({
      isImgsVisible: true,
      imgs
    });
  }

  hideImgs() {
    this.setState({
      isImgsVisible: false,
      imgs: null
    });
  }

  render() {
    const {columns, isImgsVisible, imgs} = this.state;

    return(
      <div>
        <ImgSlider isVisible={isImgsVisible} imgs={imgs} hideImgs={() => this.hideImgs()} />
        <Table columns={columns} isTransparent={isImgsVisible} />
      </div>
    );
  }
}