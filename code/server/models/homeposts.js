var mongoose = require('mongoose')
const Schema = mongoose.Schema

require('mongoose-currency').loadType(mongoose)

const locationSchema = 'Locations';

const HomePostSchema = new Schema({
    // Chủ nhà
    owner: {
        type: String,
        required: true,
    },

    // Giá
    weekdayPrice: {
        type: Number,
        min: 0,
        default: 0,
    },
    weekendPrice: {
        type: Number,
        min: 0,
        default: 0,
    },
    minimumNights: {
        type: Number,
        default: 1
    },
    currencyUnit: {
        type: String,
        default: 'VND',
        emum: ['VND', 'USD']
    },

    // Mô tả chung
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: [{
        type: String,
    }],

    // Thông tin cơ bản
    typeHome: {
        type: String,
        require: true,
        emum: ['Chung cư', 'Biệt thự', 'Căn hộ Studio', 'Nhà riêng', 'Khác']
    },
    typeRoom: {
        type: String,
        require: true,
        enum: ['Phòng riêng', 'Nguyên căn']
    },
    acreage: {
        type: Number,
        default: 0
    },
    basicPeoples: {
        type: Number,
        default: 1,
        required: true
    },
    maxPeoples: {
        type: Number,
        default: 1,
        required: true
    },

    // Phòng và giường
    numBed: {
        type: Number,
        default: 0
    },
    numBedroom: {
        type: Number,
        default: 0
    },
    numBathroom: {
        type: Number,
        default: 0
    },

    // Vị trí
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: locationSchema,
    },

    homeNumber: {
      type: String,
      default: ''
    },

    // Thông tin về duyệt tin [Dành cho admin]
    state: {
        type: String,
        default: 'New',
        enum: ['Success', 'Rejected', 'Waiting', 'RequiredEdit', 'Hiden', 'New']
    },

    confirmedBy: {
        type: String,
        default: ''
    },

    note: {
        type: String,
        default: ''
    },

    // Bình luận và đánh giá
    rating: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
    }],

    // Tiện nghi
    forFamily: [{
        type: String,
        enum: ['Phù hợp với trẻ nhỏ', 'Đệm bổ sung', 'Không hút thuốc']
    }],

    kitchenFacs: [{
        type: String,
        enum: ['Bếp điện', 'Lò vi sóng', 'Tủ lạnh', 'Bếp ga']
    }],

    funnyActs: [{
        type: String,
        enum: ['Cho thú cưng', 'BBQ', 'Cảnh quan đẹp', 'Hướng biển', 'Gần sân golf', 'Câu cá', 'Bể bơi']
    }],

    roomFacs: [{
        type: String,
        enum: ['Ban công']
    }],

    convenience: [{
        type: String,
        enum: ['Wifi', 'Tivi', 'Điều hòa', 'Máy giặt', 'Dầu gội, dầu xã', 'Giấy vệ sinh',
               'Giấy ăn', 'Nước khoáng', 'Khăn tắm', 'Kem đánh răng', 'Xà phòng tắm',
               'Thang máy','Máy sấy']
    }],

    highlightFacs: [{
        type: String,
        enum: ['Máy chiếu phim', 'Ghế massage', 'Smart tivi', 'Tủ đựng rượu']
    }]
},{
    timestamps : true
});

module.exports = mongoose.model('HomePosts',HomePostSchema)
