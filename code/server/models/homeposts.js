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

    // Giá các ngày trong tuần : thứ 2 - 6                 **********
    weekdayPrice: {
        type: Number,
        min: 0,
        default: 0,
    },
    // Giá các ngày cuối tuần: thứ 7 - chủ nhật          ***********
    weekendPrice: {
        type: Number,
        min: 0,
        default: 0,
    },
    // Số đêm tối thiểu khi đặt phòng                    ***********
    minimumNights: {
        type: Number,
        default: 1
    },
    // Đơn vị tiền tệ áp dụng                               **********
    currencyUnit: {
        type: String,
        default: 'VND',
        emum: ['VND', 'USD']
    },

    // Mô tả chung

    // Tên của nhà
    name: {
        type: String,
        required: true,
    },
    // Mô tả
    description: {
        type: String,
    },
    // Hình ảnh
    image: [{
        type: String,
    }],

    // Thông tin cơ bản
    // Loại nhà
    typeHome: {
        type: String,
        require: true,
        emum: ['Chung cư', 'Biệt thự', 'Căn hộ Studio', 'Nhà riêng', 'Khác']
    },
    // Loại homestay
    typeRoom: {
        type: String,
        require: true,
        enum: ['Phòng riêng', 'Nguyên căn']
    },
    // Diện tích
    acreage: {
        type: Number,
        default: 0
    },
    // Số nguwoif ở cơ bản           ************
    basicPeoples: {
        type: Number,
        default: 1,
        required: true
    },
    // Số người ở tối đa             *************
    maxPeoples: {
        type: Number,
        default: 1,
        required: true
    },

    // Phòng và giường
    // Số lượng giường
    numBed: {
        type: Number,
        default: 0
    },
    // Số phòng ngủ
    numBedroom: {
        type: Number,
        default: 0
    },
    // Số phòng vệ sinh
    numBathroom: {
        type: Number,
        default: 0
    },

    // Vị trí
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: locationSchema,
    },

    // Số nhà, dđường
    homeNumber: {
      type: String,
      default: ''
    },

    // Thông tin về duyệt tin [Dành cho admin]
    // Chỉ có những tin có trạng thái: SUCCESS mới được khách tìm thấy và đặt phòng //  *************
    state: {
        type: String,
        default: 'New',
        enum: ['Success', 'Rejected', 'Waiting', 'RequiredEdit', 'Hiden', 'New']
    },

    // Người duyệt tin [ADMIN]
    confirmedBy: {
        type: String,
        default: ''
    },

    // Report [ADMIN] Kết quả duyệt
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

    // Tiện ích gia đình
    forFamily: [{
        type: String,
        enum: ['Phù hợp với trẻ nhỏ', 'Đệm bổ sung', 'Không hút thuốc']
    }],

    // Tiện ích bếp
    kitchenFacs: [{
        type: String,
        enum: ['Bếp điện', 'Lò vi sóng', 'Tủ lạnh', 'Bếp ga']
    }],

    // Tiện ích giải trí
    funnyActs: [{
        type: String,
        enum: ['Cho thú cưng', 'BBQ', 'Cảnh quan đẹp', 'Hướng biển', 'Gần sân golf', 'Câu cá', 'Bể bơi', 'Bar']
    }],

    // Tiện ích phòng
    roomFacs: [{
        type: String,
        enum: ['Ban công']
    }],

    // Tiện nghi
    convenience: [{
        type: String,
        enum: ['Wifi', 'Tivi', 'Điều hòa', 'Máy giặt', 'Dầu gội, dầu xã', 'Giấy vệ sinh',
               'Giấy ăn', 'Nước khoáng', 'Khăn tắm', 'Kem đánh răng', 'Xà phòng tắm',
               'Thang máy','Máy sấy',]
    }],

    // Tiện ích nổi bật
    highlightFacs: [{
        type: String,
        enum: ['Máy chiếu phim', 'Ghế massage', 'Smart tivi', 'Tủ đựng rượu', 'Phòng tập gym']
    }]
},{
    timestamps : true
});

module.exports = mongoose.model('HomePosts',HomePostSchema)
