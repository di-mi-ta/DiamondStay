const Homeposts = require('../models/homeposts');

Homeposts.create({
    owner: 'host',
    weekdayPrice: 100000,
    weekendPrice: 500000,
    minimumNights: 1,
    currencyUnit: 'VND',
    name: 'Double bed - Garden view - Hồng trứng',
    description: 'Cho những trải nghiệm bình yên và dung dị, nơi đây dành cho những ai thích một Đà Lạt “khác”. Một Đà Lạt không phố phường, xe cộ khói bụi qua lại. Bởi nơi đây nằm ngay lưng đồi, lọt thỏm giữa thung lũng đèn vàng, đồi thông và vườn dâu xanh ngát.',
    image: [],
    typeHome: 'Chung cư',
    typeRoom: 'Phòng riêng',
    acreage: 100,
    maxPeoples: 5,
    numBed: 3,
    numBedroom: 3,
    numBathroom: 1,
    location: '5ce18272b140f025bd37f8e6',
    state: 'Waiting',
    confirmedBy: '',
    rating: [],
    forFamily: ['Phù hợp với trẻ nhỏ', 'Đệm bổ sung'],
    kitchenFacs: ['Bếp điện', 'Lò vi sóng'],
    funnyActs: ['Cho thú cưng', 'BBQ', 'Cảnh quan đẹp', 'Hướng biển'],
    roomFacs: ['Ban công'],
    convenience: ['Wifi', 'Tivi', 'Điều hòa', 'Máy giặt', 'Dầu gội, dầu xã'],
    highlightFacs: ['Máy chiếu phim', 'Ghế massage']
})