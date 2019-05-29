import React from 'react';
import '../../css/BookingBox.css';
import DatePicker from 'react-datepicker';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../redux/ActionCreators';
import PropTypes from 'prop-types';

class BookingForm extends React.Component{
    constructor(props){
        super(props);
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
            userName: undefined, //user.fullName,
            userAccount: undefined,//user.username,
            userPhoneNumber: undefined,//user.phone,
            userAddress: undefined,//'NO ADDRESS!',
            userEmail: undefined,//user.email,
            //acount
            accName: undefined,
            accNumber: undefined,
            //is edit
            userEditable: false,
            dateEditable: false,
            accEditable: false
        }
        this.ref = React.createRef();
        this.handleDateComeChange = this.handleDateComeChange.bind(this);
        this.handleDateLeaveChange = this.handleDateLeaveChange.bind(this);
        this.changeName = this.handleUserNameChange.bind(this);
        this.changePhoneNumber = this.handlePhoneNumberChange.bind(this);
        this.changeAddress = this.handleAddressChange.bind(this);
        this.changeAccName = this.handleAccNameChange.bind(this);
        this.changeAccNumber = this.handleAccNumberChange.bind(this);
        this.setUserInput = this.setUserInput.bind(this);
        this.setDateInput = this.setDateInput.bind(this);
        this.setAccInput = this.setAccInput.bind(this);
        Button.propTypes = {
            onClick: PropTypes.func
        }
    }

    setAccInput(){
        this.setState({
            accEditable: !this.state.accEditable
        });
    }

    setDateInput(){
        this.setState({
            dateEditable: !this.state.dateEditable
        });
    }

    setUserInput(){
        this.setState({
            userEditable: !this.state.userEditable
        });
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
            <div className="huge-input-container">
                <div className="searchBox container-fluid">
                     <div className="inputBox">
                        <div className="inputField">Dưới đây là thông tin chuyến đi sắp được đặt của bạn, cũng như thông tin 
                        tài khoản của bạn và tài khoản ngân hàng của bạn. <br/>
                        Hãy đảm bảo mọi thông tin dưới đây đều chính xác.</div>
                    </div>
                </div>
                <div className="searchBox container-fluid">
                     <div className="homestay-info inputBox">
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
                    <div className="user-info inputBox">
                        Thông tin người dùng
                        <input type="image" src="../assets/images/edit.svg" style={{float:"right", width: "20px"}} onClick={this.setUserInput} disabled={(this.state.userEditable) ? "disabled" : ""}/>
                        <div className="inputField">Tên của bạn</div>
                        <div className="inputContent">
                            <input type="text" value={this.state.userName} onChange={this.changeName} disabled={(this.state.userEditable) ? "" : "disabled"}/>
                        </div>
                        <div className="inputField">Tên tài khoản</div>
                        <div className="inputContent">{this.state.userAccount}</div>
                        <div className="inputField">Số diện thoại</div>
                        <div className="inputContent">
                            <input type="text" value={this.state.userPhoneNumber} onChange={this.changePhoneNumber} disabled={(this.state.userEditable) ? "" : "disabled"}/>
                        </div>
                        <div className="inputField">Địa chỉ</div>
                        <div className="inputContent">
                            <input type="text" value={this.state.userAddress} onChange={this.changeAddress} disabled={(this.state.userEditable) ? "" : "disabled"}/>
                        </div>
                        <div className="inputField">Email</div>
                        <div className="inputContent">{this.state.userEmail}</div>
                        <input type="image" src="../assets/images/save.svg" style={{float:"right", width: "20px", visibility: (this.state.userEditable) ? "" : "hidden"}} onClick={this.setUserInput} disabled={(this.state.userEditable) ? "" : "disabled"}/>
                    </div>
                </div>
                <div className="searchBox container-fluid">
                    <div className="date-picker inputBox">
                        Ngày đi/về
                        <input type="image" src="../assets/images/edit.svg" style={{float:"right", width: "20px"}} onClick={this.setDateInput} disabled={(this.state.dateEditable) ? "disabled" : ""}/>
                        <div className="inputField">Ngày đi</div>
                        <DatePicker
                            selected={this.state.dateCome}
                            onChange={this.handleDateComeChange}
                            onClick={this.setDateInput} 
                            disabled={(this.state.dateEditable) ? "" : "disabled"}
                        />
                        <div className="inputField">Ngày về</div>
                        <DatePicker
                            selected={this.state.dateLeave}
                            onChange={this.handleDateLeaveChange}
                            disabled={(this.state.dateEditable) ? "" : "disabled"}
                        />
                        <input type="image" src="../assets/images/save.svg" style={{float:"right", width: "20px", visibility: (this.state.dateEditable) ? "" : "hidden"}} onClick={this.setDateInput} disabled={(this.state.dateEditable) ? "" : "disabled"}/>
                    </div>
                    <div className="banking-info inputBox">
                        Thông tin tài khoản ngân hàng
                        <input type="image" src="../assets/images/edit.svg" style={{float:"right", width: "20px"}} onClick={this.setAccInput} disabled={(this.state.accEditable) ? "disabled" : ""}/>
                        <div className="inputField">Tên tài khoản ngân hàng</div>
                        <div className="inputContent">
                            <input type="text" value={this.state.accName} onChange={this.changeAccName} onClick={this.setAccInput} disabled={(this.state.accEditable) ? "" : "disabled"}/>
                        </div>
                        <div className="inputField">Số tài khoản ngân hàng</div>
                        <div className="inputContent">
                            <input type="text" value={this.state.accNumber} onChange={this.changeAccNumber} disabled={(this.state.accEditable) ? "" : "disabled"}/>
                        </div>
                        <input type="image" src="../assets/images/save.svg" style={{float:"right", width: "20px", visibility: (this.state.accEditable) ? "" : "hidden"}} onClick={this.setAccInput} disabled={(this.state.accEditable) ? "" : "disabled"}/>
                    </div>
                </div>
                <Button color="primary">Hoàn tất và đặt chuyến</Button>
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
