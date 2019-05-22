const Location = require('../models/location');

// Location.create({
//     province: 'Quảng Nam',
//     district: 'Phú Ninh',
// })

// Location.create({
//     province: 'Quảng Nam',
//     district: 'Tam Kỳ',
// })

// Location.create({
//     province: 'Quảng Nam',
//     district: 'Thăng Bình',
// })

// Location.create({
//     province: 'Tp. Hồ Chí Minh',
//     district: '10',
// })

// Location.create({
//     province: 'Tp. Hồ Chí Minh',
//     district: '1',
// })

// Location.create({
//     province: 'Tp. Hồ Chí Minh',
//     district: 'Bình Thạnh',
// })

// Location.create({
//     province: 'Tp. Hồ Chí Minh',
//     district: 'Thủ Đức',
// })

// Location.create({
//     province: 'Đà Nẵng',
//     district: 'Hòa Vang',
// })

// Location.create({
//     province: 'Đà Nẵng',
//     district: 'Cẩm Lệ',
// })

Location.find({})
.then((locations)=>{
    console.log(JSON.stringify(locations))
})