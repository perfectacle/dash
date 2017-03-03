'use strict';
const obj = [
  {
    'id': 2,
    'name': '오명진',
    'sex': 'null',
    'phone': '01092892844',
    'email': '123',
    'homeaddress': '경기도 수원시 장안구 수일로 135 123',
    'product_pets': [
      {
        'id': 2,
        'kind': '',
        'name': '123',
        'birth': '2015-02-01T00:00:00.000Z',
        'age': '1',
        'sex': 'Female',
        'plan': '수술입원형',
        'ratio': '50%',
        'cost': null,
        'owner_id': 2
      },
      {
        'id': 7,
        'kind': '',
        'name': '123',
        'birth': '2014-03-03T00:00:00.000Z',
        'age': '2',
        'sex': 'Female',
        'plan': '수술입원형',
        'ratio': '50%',
        'cost': '90,000',
        'owner_id': 2
      }
    ]
  }
];

const tmp = [];
obj.forEach(v => {
  v.product_pets.forEach(val => {
    for(const key in val) {
      v['pet_' + key] = val[key];
    }
    tmp.push(v);
    delete tmp[tmp.length-1].product_pets;
  });
});

console.log(tmp);