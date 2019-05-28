import React from 'react';
import '../../css/SearchBox.css';
import DatePicker from 'react-datepicker';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../redux/ActionCreators';
import queryString from 'query-string';

class BookingForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { //information of booking lies here
            //homestay
            // homestayName: undefined,
            // homestayType: undefined,
            // homestayPrice: undefined,
            // homestayAddress: undefined,
            // homestayPhoneNumber: undefined,
            // homestayEmail: undefined,
            // homestayCheckIn: undefined,
            // homestayCheckOut: undefined,
            // //user
            // userName: user.fullName,
            // userAccount: user.username,
            // userPhoneNumber: user.phone,
            // userAddress: 'NO ADDRESS!',
            // userEmail: user.email,
            // //acount
            // accName: undefined,
            // accNumber: undefined
        }
        this.ref = React.createRef();

    }

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

    handleAccNumberChange = (value) => {
        this.setState({
            accNumber: value.target.value
        });
    };

    handleAccNameChange = (value) => {
        this.setState({
            accName: value.target.value
        });
    };

    handleAddressChange = (value) => {
        this.setState({
            userAddress:value.target.value
        });
    };


    handlePhoneNumberChange = (value) =>{
        this.setState({
            userPhoneNumber:value.target.value
        });
    };

    handleUserNameChange = (value) => {
        this.setState({
            userName: value.target.value
        });
    };

    handleDateComeChange = (date) => {
        this.setState({
          dateCome: date
        });
    };

    handleDateLeaveChange = (date) => {
        this.setState({
            dateLeave: date
        });
    };

    render(){
        // KHOA
        let homepost = this.props.currentHomepost || {};
        const user = this.props.auth.user.info
        if (homepost !== {}) {
          console.log(homepost);
          console.log(user);
        }

        return(
            <div className="huge-input-container" ref={this.ref}>
                <div className="searchBox container-fluid">
                     <div className="inputBox">
                        <div className="inputField">Kiểm tra thông tin trước khi đặt chuyến nào :love: </div>
                    </div>
                </div>
                <div className="searchBox container-fluid">
                    <div className="first-col-info">
                        <div className="homestay-info">
                            Thông tin homestay
                            <div className="inputField">Tên homestay</div>
                            <div className="inputContent">{homepost.name}</div>
                            <div className="inputField">Loại homestay</div>
                            <div className="inputContent">{homepost.typeHome}</div>
                            <div className="inputField">Giá/đêm</div>
                            <div className="inputContent">{this.state.homestayPrice}$/đêm</div>
                            <div className="inputField">Địa chỉ</div>
                            <div className="inputContent">{JSON.stringify(homepost.location)}</div>
                            <div className="inputField">Số điện thoại liên hệ</div>
                            <div className="inputContent">{this.state.homestayPhoneNumber}</div>
                            <div className="inputField">Email liên hệ:</div>
                            <div className="inputContent">{this.state.homestayEmail}</div>
                        </div>
                        <br/>
                        <div className="user-info">
                            Thông tin người dùng
                            <div className="inputField">Tên của bạn</div>
                            <div className="inputContent">
                                <input type="text" value={this.state.userName} onChange={this.changeName}/>
                            </div>
                            <div className="inputField">Tên tài khoản</div>
                            <div className="inputContent">{this.state.userAccount}</div>
                            <div className="inputField">Số diện thoại</div>
                            <div className="inputContent">
                                <input type="text" value={this.state.userPhoneNumber} onChange={this.changePhoneNumber}/>
                            </div>
                            <div className="inputField">Địa chỉ</div>
                            <div className="inputContent">
                                <input type="text" value={this.state.userAddress} onChange={this.changeAddress}/>
                            </div>
                            <div className="inputField">Email</div>
                            <div className="inputContent">{this.state.userEmail}</div>
                        </div>
                    </div>
                    <div className="second-col-info inputBox">
                        <div className="date-picker">
                        <div className="inputField">Ngày đi</div>
                            <DatePicker
                                selected={this.state.dateCome}
                                onChange={this.handleDateComeChange}
                            />
                            <div className="inputField">Ngày về</div>
                            <DatePicker
                                selected={this.state.dateLeave}
                                onChange={this.handleDateLeaveChange}
                            />
                        </div>
                        <div className="banking-info">
                            <div className="inputField">Tên tài khoản ngân hàng</div>
                            <div className="inputContent">
                                <input type="text" value={this.state.accName} onChange={this.changeAccName}/>
                            </div>
                            <div className="inputField">Số tài khoản ngân hàng</div>
                            <div className="inputContent">
                                <input type="text" value={this.state.accNumber} onChange={this.changeAccNumber}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button-and-conditions">
                    <Button color="primary">Đặt phòng</Button>
                </div>
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
