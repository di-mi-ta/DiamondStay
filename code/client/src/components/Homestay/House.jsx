import React, { Component } from 'react';
import "../../css/House.css"
import HouseCarousel from './HouseCarousel';
import HouseSideBar from './HouseSideBar';
import HouseComment from './HouseComment';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import MainHeader from '../HomePage/MainHeader';
import SystemPromoCard from './SystemPromosCard';
import {baseUrl} from '../../shared/baseUrl';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class House extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      verify: true,
      location: "",
      rating: 5,
      numRating: 6,
      //home info
      name: "",
      minimumNights: 1,
      weekdayPrice: 10,
      weekendPrice: 100,
    }
  }

  componentWillMount(){
    this.props.fetchHomepostById(this.props.match.params.homepostId);
  }

  componentDidMount(){
    this.props.fetchSystemPromos();
    this.props.fetchHostPromos();
  }

  render() {
    console.log("comment: ",
    this.props.homeposts.currentHomepost?
    this.props.homeposts.currentHomepost.rating
    : ""
    );
    const queryInUrl = this.props.location.search;
    const query = {
      ...queryString.parse(queryInUrl),
      homepostId: this.props.match.params.homepostId,
    };
    
    // for promotions 

    // get list system promotions applied for current homeposts
    let sysPromos = this.props.promotions.systemPromos.filter((promo) => {
      const currentTime = Date();
      if (Date(promo.dateStart) <= currentTime && currentTime <= Date(promo.dateEnd)){
        return true
      }
      return false
    });

    // get list promotions of host applied for current homeposts
    let hostPromos = this.props.promotions.hostPromotions.filter((promo) => {
      const currentTime = Date();
      if (this.props.homeposts.currentHomepost){
        if (Date(promo.dateStart) <= currentTime && currentTime <= Date(promo.dateEnd)){
          if (promo.homeposts.includes(this.props.homeposts.currentHomepost._id)){
            return true;
          }
        }
      }
      return false
    });


    return (
      <div>
        <MainHeader/>
        {
          this.props.homeposts.currentHomepost?
          <div className="housePage container-fluid">
            <HouseCarousel images={this.props.homeposts.currentHomepost.image.map(item => baseUrl + item)}/>
            <div className="house-information container-fluid">
              <div className="row">
                <div className="title col-12">
                  <div className="booking">
                    <h1>{this.props.homeposts.currentHomepost.name}</h1>
                    <button type="button" className="btn book-house">
                      <Link to={`/booking/new?${queryString.stringify(query)}`}>
                        Đặt ngay
                      </Link>
                    </button>
                  </div>
                  <span className="label-house-id">
                    Mã chỗ ở: {this.props.homeposts.currentHomepost._id}
                  </span>
                  <span className={this.state.verify? "label-verify": "label-not-verify"}>
                      {this.state.verify? 'Đã xác minh': 'Chưa xác minh'}
                  </span>
                </div>
                <div className="location col-12">
                  <span>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    {
                      this.props.homeposts.currentHomepost.location?
                      this.props.homeposts.currentHomepost.location.district
                      + " - " + this.props.homeposts.currentHomepost.location.province
                      + " - " + this.props.homeposts.currentHomepost.location.country
                      : "Chưa rõ"
                    }
                  </span>
                  <span>
                    <span className="rating">
                      {
                        this.props.homeposts.currentHomepost.rating.length > 0?
                        Math.floor(
                          this.props.homeposts.currentHomepost.rating
                          .map(rating => rating.rating)
                          .reduce((a, b) => a + b, 0) / this.props.homeposts.currentHomepost.rating.length
                        )
                        : 0
                      }
                    </span> / 5 điểm - {
                      this.props.homeposts.currentHomepost.rating.length
                    } đánh giá
                  </span>
                </div>
                <div className="col-12 col-md-8">
                  <SystemPromoCard 
                    promotion={sysPromos[0]}
                  />
                  {/* <Convenience/> */}
                  <div className="priceTable">
                    <h2>Giá phòng</h2>
                    <p>Giá có thể tăng vào cuối tuần hoặc ngày lễ</p>
                    <div className="listPrice">
                      <div>
                        <span>Thứ 2 - Thứ 6</span>
                        <span><b>{
                          this.props.homeposts.currentHomepost.weekdayPrice
                          + " " + this.props.homeposts.currentHomepost.currencyUnit
                        }</b></span>
                      </div>
                      <div>
                        <span>Thứ 7 - Chủ nhật</span>
                        <span><b>{
                          this.props.homeposts.currentHomepost.weekendPrice
                          + " " + this.props.homeposts.currentHomepost.currencyUnit
                        }</b></span>
                      </div>
                      <div>
                        <span>Số đêm tối thiểu</span>
                        <span><b>{this.props.homeposts.currentHomepost.minimumNights} Đêm</b></span>
                      </div>
                    </div>
                  </div>
                  <HouseComment
                    style={{"margin-top": "40px"}}
                    homepostId={this.props.homeposts.currentHomepost._id}
                    comments={
                      this.props.homeposts.currentHomepost.rating.map(rating => ({
                        id: rating._id,
                        username: rating.author? rating.author.lastName + " " + rating.author.firstName: "vô danh",
                        avatar: "http://fme.iuh.edu.vn/wp-content/uploads/2017/04/ABET080417-02.jpg",
                        time: new Date(rating.updatedAt),
                        content: rating.comment,
                        numStar: rating.rating
                      }))
                    }
                  />
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
                <div className="sidebar col-12 col-md-4">
                  <HouseSideBar
                    currentHomepost = {this.props.homeposts.currentHomepost}
                  />
                </div>
              </div>
            </div>
          </div>
          : ""
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
  promotions: state.promotions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchHomepostById: homeId => {dispatch(actions.fetchHomepostById(homeId))},
  fetchSystemPromos: () => {dispatch(actions.fetchSystemPromos())},
  fetchHostPromos: () => {dispatch(actions.fetchHostPromos())},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(House));
