import React, { Component } from 'react';
import "../css/House.css"
import HouseCarousel from './HouseCarousel';
import HouseSideBar from './HouseSideBar';
import HouseComment from './HouseComment';

class House extends Component {
    constructor() {
        super();
        this.state = {
          id: "4313421",
          verify: false,
          location: "Sóc Sơn, Hà Nội, Vietnam",
          rating: 5,
          numRating: 6
        }
    }

    render() {
        return (
          <div className="housePage container-fluid">
            <HouseCarousel/>
            <div className="house-information container-fluid">
              <div className="row">
                <div className="title col-12">
                  <div className="booking">
                    <h1>Babylon House - Bungalow Bằng Lăng Trắng </h1>
                    <button type="button" className="btn book-house">Đặt ngay</button>
                  </div>
                  <span className="label-house-id">Mã chỗ ở: {this.state.id}</span>
                  <span className={this.state.verify? "label-verify": "label-not-verify"}>
                      {this.state.verify? 'Đã xác minh': 'Chưa xác minh'}
                  </span>
                </div>
                <div className="location col-12">
                  <span>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    {this.state.location}
                  </span>
                  <span>
                    <span className="rating">{this.state.rating}</span> / 5 điểm - {this.state.numRating} đánh giá
                  </span>
                </div>
                <div className="col-12 col-sm-8">
                  {/* <Convenience/> */}
                  <div className="priceTable">
                    <h2>Giá phòng</h2>
                    <p>Giá có thể tăng vào cuối tuần hoặc ngày lễ</p>
                    <div className="listPrice">
                      <div>
                        <span>Thứ 2 - Thứ 5</span>
                        <span><b>$86.73</b></span>
                      </div>
                      <div>
                        <span>Thứ 6 - Chủ nhật</span>
                        <span><b>$96.73</b></span>
                      </div>
                      <div>
                        <span>Phí khách tăng thêm</span>
                        <span><b>$26.73 (sau 1 khách)</b></span>
                      </div>
                      <div>
                        <span>Phí khách tăng thêm</span>
                        <span><b>$36.73 (sau 2 khách)</b></span>
                      </div>
                    </div>
                  </div>
                  <HouseComment style={{"margin-top": "40px"}}/>
                  <div className="policy">
                    <h2>Nội quy và chính sách về chỗ ở</h2>
                    <div className="note">
                      <h3 className="title">Chính sách hủy phòng</h3>
                      <div className="content">
                        <p><b>Nghiêm ngặt:</b> Loại chỗ ở này cho phép bạn hủy đặt phòng 7 ngày trước khi check-in và được hoàn lại 50% tổng số tiền đã trả. Luxstay không hoàn lại tiền nếu khách hàng hủy phòng sau thời gian này.</p>
                      </div>
                    </div>
                    <div className="note">
                      <h3 className="title">Lưu ý đặc biệt</h3>
                      <div className="content">
                        <p>Giá phòng đã bao gồm ăn uống và các dịch vụ...</p>
                        <p>Chỉ nhận các cặp đôi trên 18 tuổi, không nhận trẻ em đi cùng và các hội nhóm.</p>
                        <p>Quý khách không mang theo vật nuôi.</p>
                        <p>Quý khách vui lòng không hút thuốc lá trong phòng.</p>
                      </div>
                    </div>
                    <div className="note">
                      <h3 className="title">Chi tiết khác</h3>
                      <div className="content">
                        <div>
                          <span>Nhận phòng</span>
                          <span><b>02:00 PM</b></span>
                        </div>
                        <div>
                          <span>Trả phòng</span>
                          <span><b>12:00 PM</b></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar col-12 col-sm-4">
                  <HouseSideBar/>
                </div>
              </div>
            </div>
          </div>
        );
    }

    componentDidMount() {
        // fetch information about house
    }
}

export default House;