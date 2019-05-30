import React from 'react';
import '../../css/BookingBox.css';
import DatePicker from 'react-datepicker';
import {Button} from 'reactstrap';
import { Spin, message as notification } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../redux/ActionCreators';
import queryString from 'query-string';
import * as apiHelper from '../../utils/api/booking';
import moment from 'moment';
import numberSeparator from "number-separator";

class BookingForm extends React.Component{
    constructor(props){
        super(props);
          this.state = { //information of booking lies here
              booking: {
              dateCheckin: undefined,
              dateCheckout: undefined,
            },
            userEditable: false,
            dateEditable: true,
            accEditable: false,
            hasInfo: false,
        };

        this.ref = React.createRef();
        // this.changeName = this.handleUserNameChange.bind(this);
        // this.changePhoneNumber = this.handlePhoneNumberChange.bind(this);
        // this.changeAddress = this.handleAddressChange.bind(this);
        // this.changeAccNumber = this.handleAccNumberChange.bind(this);
        // this.setUserInput = this.setUserInput.bind(this);
        this.setDateInput = this.setDateInput.bind(this);
        // this.setAccInput = this.setAccInput.bind(this);
    }

    getHomepostId = () => {
      const queryInUrl = this.props.location.search;
      const query = queryString.parse(queryInUrl);
      return query.homepostId;
    };

    componentDidMount() {
      // Parse query trên url
      const queryInUrl = this.props.location.search;
      const query = queryString.parse(queryInUrl);

      // Chỉ lấy những trường cần
      // Bỏ qua những trường khác người dùng nhập vào
      const data = {
          homepostId: query.homepostId,
          //.....
      };

      // Validate các trường nhập vào (OPTIONAL)

      // Lấy thông tin homepost nếu cần
      this.props.fetchHomepostById(data.homepostId);
      // Sau khi xong, component sẽ tự render() lại
      // homepost nằm trong this.props.currentHomepost
    }

    handleBookConfirm = () => {
      if (!this.state.booking.dateCheckin || !this.state.booking.dateCheckout)
        return notification.warn('Ngày checkin hoặc checkout còn trống!');

      apiHelper.sendNewBooking({
        home: this.getHomepostId(),
        dateCheckin: this.state.booking.dateCheckin,
        dateCheckout: this.state.booking.dateCheckout,
      }).then(res => {
        notification.success('Đặt phòng thành cộng');
      }).catch(err => {
        let errString;
        if (err && err.message)
          errString = err.message;
        else
          errString = 'Xảy ra lỗi, đặt phòng không thành công';
        notification.error(errString);
      })
    };

    calculateTotalCost = () => {
      let homepost = this.props.currentHomepost;
      if (!homepost)
        return 0;
      const checkin = this.state.booking.dateCheckin;
      const checkout = this.state.booking.dateCheckout;
      if (!checkin || !checkout)
        return 0;
      const dateCount = moment(checkout).diff(moment(checkin), 'days');
      if (isNaN(dateCount) || dateCount <= 0)
        return 0;
      return dateCount * homepost.weekdayPrice;
    };

    // handleAccNumberChange = (value) => {
    //     this.setState({
    //         accNumber: value.target.value
    //     });
    // };
    //
    // handleAddressChange = (value) => {
    //     this.setState({
    //         userAddress:value.target.value
    //     });
    // };
    //
    //
    // handlePhoneNumberChange = (value) =>{
    //     this.setState({
    //         userPhoneNumber:value.target.value
    //     });
    // };
    //
    // handleUserNameChange = (value) => {
    //     this.setState({
    //         userName: value.target.value
    //     });
    // };

    handleDateComeChange = (date) => {
        this.setState({
          booking: {
            ...this.state.booking,
            dateCheckin: date
          }
        });
    };

    handleDateLeaveChange = (date) => {
        this.setState({
          booking: {
            ...this.state.booking,
            dateCheckout: date
          }
        });
    };

    // setAccInput(){
    //     this.setState({
    //         accEditable: !this.state.accEditable
    //     });
    // }
    //
    setDateInput(){
        this.setState({
            dateEditable: !this.state.dateEditable
        });
    }
    //
    // setUserInput(){
    //     this.setState({
    //         userEditable: !this.state.userEditable
    //     });
    // }

    render(){
        // KHOA
        let homepost = this.props.currentHomepost;
        const user = this.props.auth.user.info
        if (!homepost || !user) {
          return (<Spin />);
        }

        return(
            <div className="container col-md-10" ref={this.ref} styles={{ width: '80%', textAlign: 'center' }}>
                <div className="searchBox container-fluid">
                     <div className="inputBox">
                     <div className="inputField">Dưới đây là thông tin chuyến đi sắp được đặt của bạn, cũng như thông tin
                        tài khoản của bạn và tài khoản ngân hàng của bạn. <br/>
                        Hãy đảm bảo mọi thông tin dưới đây đều chính xác.</div>
                    </div>
                </div>
                <div className="searchBox container-fluid">
                    <div className="homestay-info inputBox">
                        Thông tin homestay
                        <div className="inputField">Tên homestay</div>
                        <div className="inputContent">{homepost.name}</div>
                        <div className="inputField">Loại homestay</div>
                        <div className="inputContent">{homepost.typeHome}</div>
                        {/* <div className="inputField">Số đêm</div>
                        <div className="inputContent">{this.state.nights}đêm</div> */}
                        {/* <div className="inputField">Số khách</div>
                        <div className="inputContent">{this.state.numGuests}</div> */}
                        <div className="inputField">Giá/đêm</div>
                        <div className="inputContent">{numberSeparator(homepost.weekdayPrice, '.')} VND/đêm</div>
                        <div className="inputField">Tổng tiền</div>
                        <div className="inputContent">{numberSeparator(this.calculateTotalCost(), '.')} VND</div>
                        {/* <div className="inputField">Chính sách</div>
                        <div className="inputContent">{this.state.policy}$/đêm</div> */}
                        {/* <div className="inputField">Địa chỉ</div>
                        <div className="inputContent">{JSON.stringify(homepost.location)}</div> */}
                    </div>
                    <div className="user-info inputBox">
                        Thông tin người dùng
                        <input type="image" src="../assets/images/edit.svg" style={{float:"right", width: "20px"}} onClick={this.setUserInput} disabled={(this.state.userEditable) ? "disabled" : ""}/>
                        <div className="inputField">Tên của bạn</div>
                        {/* <div className="inputContent">
                        <input type="text" value={user.fullName} onChange={this.changeName} disabled={(this.state.userEditable) ? "" : "disabled"}/>
                        </div> */}
                        <div className="inputContent">{user.fullName || 'Chưa có'}</div>

                        {/* <div className="inputField">Tên tài khoản</div>
                        <div className="inputContent">{user.username}</div> */}
                        <div className="inputField">Số diện thoại</div>
                        {/* <div className="inputContent">
                        <input type="text" value={user.phone || 'Chưa có'} onChange={this.changePhoneNumber} disabled={(this.state.userEditable) ? "" : "disabled"}/>
                        </div> */}
                        <div className="inputContent">{user.phone || 'Chưa có'}</div>

                        {/* <div className="inputField">Địa chỉ</div>
                        <div className="inputContent">
                        <input type="text" value={this.state.userAddress} onChange={this.changeAddress} disabled={(this.state.userEditable) ? "" : "disabled"}/>
                        </div> */}
                        <div className="inputField">Email</div>
                        <div className="inputContent">{user.email || 'Chưa có'}</div>
                        <input type="image" src="../assets/images/save.svg" style={{float:"right", width: "20px", visibility: (this.state.userEditable) ? "" : "hidden"}} onClick={this.setUserInput} disabled={(this.state.userEditable) ? "" : "disabled"}/>
                    </div>
                </div>
                <div className="searchBox container-fluid">
                    <div className="date-picker inputBox">
                        Ngày đi/về
                        <input type="image" src="../assets/images/edit.svg" style={{float:"right", width: "20px"}} onClick={this.setDateInput} disabled={(this.state.dateEditable) ? "disabled" : ""}/>
                        <div className="inputField">Ngày đi</div>
                            <DatePicker
                                selected={this.state.booking.dateCheckin}
                                minDate={new Date()}
                                onChange={this.handleDateComeChange}
                                onClick={this.setDateInput}
                                disabled={(this.state.dateEditable) ? "" : "disabled"}
                            />
                        <div className="inputField">Ngày về</div>
                        <DatePicker
                            selected={this.state.booking.dateCheckout}
                            minDate={this.state.booking.dateCheckin ? moment(this.state.booking.dateCheckin).add(1, 'days').toDate() : new Date()}
                            onChange={this.handleDateLeaveChange}
                            disabled={(this.state.dateEditable) ? "" : "disabled"}
                        />
                        <input type="image" src="../assets/images/save.svg" style={{float:"right", width: "20px", visibility: (this.state.dateEditable) ? "" : "hidden"}} onClick={this.setDateInput} disabled={(this.state.dateEditable) ? "" : "disabled"}/>
                    </div>
                    <div className="banking-info inputBox">
                        Thông tin số tiền
                        <div className="inputField">Số coin hiện có</div>
                        <div className="inputContent">{numberSeparator(user.coin, '.')}</div>
                    </div>
                </div>
                <Button color="primary" onClick={this.handleBookConfirm}>Hoàn tất và đặt chuyến</Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  homeposts: state.homeposts,
  promotions: state.promotions,
  currentHomepost: state.homeposts.currentHomepost,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSystemPromos: () => {dispatch(actions.fetchSystemPromos())},
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchHomepostById: (homepostId) => {dispatch(actions.fetchHomepostById(homepostId))},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingForm));
