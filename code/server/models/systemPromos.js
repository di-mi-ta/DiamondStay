var mongoose = require('mongoose')
const Schema = mongoose.Schema

const promotionSchema = new Schema({
    // Tên đợt khuyến mãi
    name: {
        type: String,
        required: true,
    },
    // logo 
    logoPath: {
        type: String,
        default: ''
    },
    // Don vi: % / booking 
    value: { 
        type: Number,
        default: 0.0,
    },
    // Giá trị khuyến mại tối đa có thể nhận được 
    maxValueToReceive: {
        type: Number,
        default: 0.0,
    },
    // Giá trị booking tối thiểu để có thể áp dụng khuyến mãi này
    minValueBooking: {
        type: Number,
        default: -1
    },
    // Số lượng lần tối đa có thể áp dụng
    maxNumBookingApplied: {
        type: Number,
        default: -1
    },
    // Mã code 
    code: {
        type: String,
        default: '',
        unique: true
    },
    // Ngày bắt đầu 
    dateStart: {
        type: Date,
        defaut: ''
    },
    // Ngày kết thúc
    dateEnd: {
        type: Date,
        default: ''
    },
    // Người tạo
    creator: {
        type: String,
        required: true,
    },
},{
    timestamps: true
})

module.exports = mongoose.model('SystemPromos', promotionSchema);
