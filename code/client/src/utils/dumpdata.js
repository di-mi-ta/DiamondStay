const baseUrl = 'http://localhost:4444';
const axios = require('axios');

const data = [
  {
    owner: 'host',
    name: 'Tên để đây, copy bỏ qua?',
    description: 'Mô tả qua Luxstay copy?',
    typeHome: ['Chung cư', 'Biệt thự', 'Căn hộ Studio', 'Nhà riêng', 'Khác'][1],
    typeRoom: ['Phòng riêng', 'Nguyên căn'][0],
    acreage: 100,

    weekdayPrice: 3000000,
    weekendPrice: 3000000,
    minimumNights: 1,
    basicPeoples: 2,
    maxPeoples: 4,
    numBed: 2,
    numBeroom: 2,
    numBathroom: 1,

    forFamily: ['Đệm bổ sung', 'Không hút thuốc'],
    kitchenFacs: ['Bếp điện', 'Lò vi sóng', 'Tủ lạnh'],
    funnyActs: ['BBQ', 'Cảnh quan đẹp', 'Hướng biển'],
    roomFacs: [],
    highlightFacs: ['Máy chiếu phim']
  },
  {
    owner: 'host',
    name: 'Tên để đây, copy bỏ qua?',
    description: 'Mô tả qua Luxstay copy?',
    typeHome: ['Chung cư', 'Biệt thự', 'Căn hộ Studio', 'Nhà riêng', 'Khác'][1],
    typeRoom: ['Phòng riêng', 'Nguyên căn'][0],
    acreage: 100,

    weekdayPrice: 3000000,
    weekendPrice: 3000000,
    minimumNights: 1,
    basicPeoples: 2,
    maxPeoples: 4,
    numBed: 2,
    numBeroom: 2,
    numBathroom: 1,

    forFamily: ['Đệm bổ sung', 'Không hút thuốc'],
    kitchenFacs: ['Bếp điện', 'Lò vi sóng', 'Tủ lạnh'],
    funnyActs: ['BBQ', 'Cảnh quan đẹp', 'Hướng biển'],
    roomFacs: [],
    highlightFacs: ['Máy chiếu phim']
  }
];


axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U5NDM3NGIyOTU1NTdiMjFkMDNjMDQiLCJpYXQiOjE1NTkxODg5NzMsImV4cCI6MTU2MTc4MDk3M30.plWiXMnHm-iE_5ai0CbL7r3zK91Vl1ou4pM1N7ANbsA';
axios.defaults.validateStatus = function (status) { return true; }; // don't care about status codes

data.forEach((home, index) => {
  axios.post('/homeposts', home)
  .then(res => {
    if (res.error)
      console.log('LỖI, index =', index);
    else
      console.log('OK 1 homepost')
  }).catch(err => {
      console.log('LỖI, index =', index, err);
  })
})
