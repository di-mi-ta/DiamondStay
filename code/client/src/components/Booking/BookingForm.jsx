import React from 'react';
import '../../css/SearchBox.css';
import DatePicker from 'react-datepicker';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';

class BookingForm extends React.Component{
    constructor(props){
        super(props);
        const user = this.props.auth.user.info;
        this.state = { //information of booking lies here
            //homestay
            homestayName: undefined,
            homestayType: undefined,
            homestayPrice: undefined,
            homestayAddress: undefined,
            homestayPhoneNumber: undefined,
            homestayEmail: undefined,
            homestayCheckIn: undefined,
            homestayCheckOut: undefined,
            //user
            userName: user.fullName,
            userAccount: user.username,
            userPhoneNumber: user.phone,
            userAddress: 'NO ADDRESS!',
            userEmail: user.email,
            //acount
            accName: undefined,
            accNumber: undefined
        }
        this.ref = React.createRef();
        this.handleDateComeChange = this.handleDateComeChange.bind(this);
        this.handleDateLeaveChange = this.handleDateLeaveChange.bind(this);
        this.changeName = this.handleUserNameChange.bind(this);
        this.changePhoneNumber = this.handlePhoneNumberChange.bind(this);
        this.changeAddress = this.handleAddressChange.bind(this);
        this.changeAccName = this.handleAccNameChange.bind(this);
        this.changeAccNumber = this.handleAccNumberChange.bind(this);
        //functions lies here
    }

    handleAccNumberChange(value){
        this.setState({
            accNumber: value.target.value
        });
    }

    handleAccNameChange(value){
        this.setState({
            accName: value.target.value
        });
    }

    handleAddressChange(value){
        this.setState({
            userAddress:value.target.value
        });
    }


    handlePhoneNumberChange(value){
        this.setState({
            userPhoneNumber:value.target.value
        });
    }

    handleUserNameChange(value){
        this.setState({
            userName: value.target.value
        });
    }



    handleDateComeChange(date) {
        this.setState({
          dateCome: date
        });
      }

    handleDateLeaveChange(date) {
        this.setState({
            dateLeave: date
        });
    }

    render(){
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
                            <div className="inputContent">{this.state.homestayName}</div>
                            <div className="inputField">Loại homestay</div>
                            <div className="inputContent">{this.state.homestayType}</div>
                            <div className="inputField">Giá/đêm</div>
                            <div className="inputContent">{this.state.homestayPrice}$/đêm</div>
                            <div className="inputField">Địa chỉ</div>
                            <div className="inputContent">{this.state.homestayAddress}</div>
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
                    <div classsName="second-col-info inputBox">
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchSystemPromos: () => {dispatch(actions.fetchSystemPromos())},
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
