'use strict';
const obj = {
  "id": 122,
  "name": "김보람",
  "sex": "female",
  "phone": "89011227099",
  "email": "52bor@hanmail.net",
  "homeaddress": "대구광역시 동구 율하동로15길 4 행복시티 302호",
  "product_pets": [
    {
      "id": 212,
      "kind": "",
      "name": "뭉치",
      "birth": "2016-12-01T00:00:00.000Z",
      "age": "0",
      "sex": "Female",
      "plan": "종합형",
      "ratio": "70%",
      "cost": "244,640",
      "owner_id": 122
    },
    {
      "id": 213,
      "kind": "",
      "name": "참치",
      "birth": "2016-11-05T00:00:00.000Z",
      "age": "0",
      "sex": "Female",
      "plan": "종합형",
      "ratio": "70%",
      "cost": "244,640",
      "owner_id": 122
    }
  ]
}

delete obj.product_pets;
console.log(obj);