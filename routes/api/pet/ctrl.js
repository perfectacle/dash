'use strict';
const jwt = require('jsonwebtoken');
const config = require(`${global.ROOT}/config`);
const models = require(`${global.ROOT}/models`);
const secret = config.key;
const lib = require(`${global.ROOT}/lib/lib.js`);

exports.getAll = (req, res) => {
  const {'x-access-token': token} = req.headers;
  jwt.verify(token, secret, (err) => {
    if(err) {
      return res.status(401).json({});
    }

    models.contract_users.findAll({
      include: {
        model: models.product_pets,
        required: true,
        include: [{
          model: models.payments,
          required: true
        }, {
          model: models.petimages,
          required: true
        }]
      }
    }).then(results => {
      const tmp = [];
      results.forEach(v => {
        // 받아온 데이터를 react-table에 뿌려주려면 변환작업이 필요하다.
        // 시퀄라이즈로 받아온 results는 바로 접근 불가능하고, dataValues 객체를 통해 접근 가능하다.
        v.dataValues.product_pets.forEach(val => {
          // v: contract_user, val: product_pets
          // 참조 관계 때문에 데이터가 꼬여서 얕은 복사
          const temp = Object.assign({}, v.dataValues);

          // DB에 있는 그대로 뿌려주는 게 아니라 한글로 변환 후 뿌려줌.
          temp.sex = v.dataValues.sex === 'female' ? '여성' : '남성';

          // product_pets는 payment와 petimage 테이블을 하나씩 가지고 있다.
          for(let key in val.dataValues) {
            if(key === 'payment') { // payment 테이블
              for(let key2 in val[key].dataValues) {
                const val2 = val[key].dataValues;
                if(key2 === 'paid_date') {
                  temp['pay_paidDate'] = lib.getDateForm(val2[key2]);
                } else if(key2 === 'type') {
                  if(val2[key2] === 'vbank') temp['pay_type'] = '가상 계좌';
                  else if(val2[key2] === 'card') temp['pay_type'] = '카드';
                  else temp['pay_type'] = '현금';
                } else if(key2 === 'status') {
                  temp['pay_status'] = val2[key2] === 'ready' ? '미결제' : '결제 완료';
                }
              }
            }

            else if(key === 'petimage') { // petimage 테이블
              temp['images_pet'] = [];
              for(let key2 in val[key].dataValues) {
                const val2 = val[key].dataValues;
                if(~key2.indexOf('image') && val2[key2]) temp['images_pet'].push(val2[key2]);
              }
            }

            // product_pets 테이블
            else if(key === 'sex') {
              temp['pet_sex'] = val[key] === 'Male' ? '수컷' : '암컷';
            } else if(key === 'kind') {
              temp['pet_kind'] = val[key] ? '강아지' : '고양이';
            } else if(key === 'birth') {
              temp['pet_birth'] = lib.getDateForm(val[key]);
            } else if(key === 'plan') {
              temp['pet_planNratio'] = val[key] + ' / ';
            } else if(key === 'ratio') {
              temp['pet_planNratio'] += val[key];
            }

            // 위에는 가공이 필요한 데이터들이고, 아래는 저장한 고대로 뿌려주는 데이터
            else {
              temp['pet_' + key] = val[key];
            }
          }

          delete temp.product_pets;
          tmp.push(temp);
        });
      });

      res.json(tmp);
    }).catch(err => res.json(err));
  });
};