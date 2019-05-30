import React, { Component } from 'react';
import "../../css/House.css"
import HouseCarousel from './HouseCarousel';
import HouseSideBar from './HouseSideBar';
import HouseComment from './HouseComment';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import MainHeader from '../HomePage/MainHeader';
import SystemPromoCard from './SystemPromosCard';
import MessageEdit from '../MessageInbox/MessageEdit';
import { Modal, Spin, message as notification } from 'antd';
import {baseUrl} from '../../shared/baseUrl';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import * as userApi from '../../utils/api/user';
import * as messageApi from '../../utils/api/message';
import moment from 'moment';

function getDateAt12AM(dateString) {
  const date = new Date(dateString);
  date.setHours(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setMilliseconds(0);
  return date;
}

class House extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    messageModalOpen: false,
    receiver: undefined,
  };

  componentWillMount(){
    this.props.fetchHomepostById(this.props.match.params.homepostId);
  }

  componentDidMount(){
    this.props.fetchHomepostById(this.props.match.params.homepostId);
    this.props.fetchSystemPromos();
    this.props.fetchHostPromos();
    this.getHomeOwnerInfoInterval = setInterval(() => {
      if (this.props.homeposts && this.props.homeposts.currentHomepost && this.props.homeposts.currentHomepost.owner) {
        userApi.getUserFromUsername(this.props.homeposts.currentHomepost.owner)
          .then(user => {
            clearInterval(this.getHomeOwnerInfoInterval);
            user.fullName = user.firstName + ' ' + user.lastName;
            this.setState({ user });
          }).catch();
      }
    }, 3000);
  }

  componentWillUnmount() {
    if (this.getHomeOwnerInfoInterval)
      clearInterval(this.getHomeOwnerInfoInterval);
  }

  toggleMessageModal = () => {
    this.setState(prevState => ({
      messageModalOpen: !prevState.messageModalOpen
    }))
  };

  handleSendMessage = (message) => {
    if (!this.state.user)
      return notification.error('Xảy ra lỗi, không thể gửi tin nhắn');

    messageApi.sendReplyMessage(message).then(() => {
      notification.success('Tin nhắn đã được gửi');
      this.toggleMessageModal();
    }).catch(err => {
      notification.error('Có lỗi xảy ra. Tin nhắn chưa được gửi.');
      this.toggleMessageModal();
    });
  };

  render() {
    const queryInUrl = this.props.location.search;
    const query = {
      ...queryString.parse(queryInUrl),
      homepostId: this.props.match.params.homepostId,
    };

    // for promotions

    // get list system promotions applied for current homeposts
    let sysPromos = this.props.promotions.systemPromos.filter((promo) => {
      const currentTime = Date.now();
      return moment(getDateAt12AM(currentTime))
                            .isBetween(getDateAt12AM(promo.dateStart), getDateAt12AM(promo.dateEnd), null, '[]')
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
                    <button type="button" className="btn book-house float-right" onClick={this.toggleMessageModal}>
                        Gửi tin nhắn cho chủ nhà
                      </button>
                    <button type="button" className="btn book-house">
                      <Link to={`/booking/new?${queryString.stringify(query)}`}>
                        Đặt ngay
                      </Link>
                    </button>
                  </div>
                  <div className="booking">

                  </div>
                  <span className="label-house-id">
                    Mã chỗ ở: {this.props.homeposts.currentHomepost._id}
                  </span>
                  <span className={true? "label-verify": "label-not-verify"}>
                      {true? 'Đã xác minh': 'Chưa xác minh'}
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
                  {
                    sysPromos.length >=1 ?
                      <SystemPromoCard
                        promotion={sysPromos[0]}
                      />
                      :
                      <div/>
                  }
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
            <Modal
              visible={this.state.messageModalOpen}
              width={700}
              onOk={this.toggleMessageModal}
              onCancel={this.toggleMessageModal}
            >
              {this.state.user ?
                <MessageEdit
                  receiverName={this.state.user.fullName}
                  receiverId={this.state.user._id}
                  defaultTitle={''}
                  defaultContent={''}
                  onSendMessage={this.handleSendMessage}
                  onReturn={this.toggleMessageModal}
                />
                :
                <div style={{ textAlign: 'center' }}>
                  <Spin tip='Đang tải dữ liệu chủ nhà' />
                </div>
              }
            </Modal>
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
