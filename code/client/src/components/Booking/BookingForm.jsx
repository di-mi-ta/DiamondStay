import React from 'react';
import '../../css/SearchBox.css';
import DatePicker from 'react-datepicker';

class BookingForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { //information of booking lies here
            dateCome: undefined, //set them from main page
            dateLeave: undefined,
        }
        this.ref = React.createRef();
        this.handleDateComeChange = this.handleDateComeChange.bind(this);
        this.handleDateLeaveChange = this.handleDateLeaveChange.bind(this);
        //functions lies here
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
                            <div className="inputContent">a</div>
                            <div className="inputField">Loại homestay</div>
                            <div className="inputContent">w</div>
                            <div className="inputField">Giá/đêm</div>
                            <div className="inputContent">w</div>
                            <div className="inputField">Địa chỉ: </div>
                            <div className="inputContent">w</div>
                            <div className="inputField">Số điện thoại liên hệ: </div>
                            <div className="inputContent">w</div>
                            <div className="inputField">Email liên hệ:</div>
                            <div className="inputContent">w</div>
                        </div>
                        <br/>
                        <div className="user-info">
                            Thông tin người dùng
                            <div className="inputField">Tên của bạn</div>
                            <div className="inputContent">
                                <input type="text"/>
                            </div>
                            <div className="inputField">Tên tài khoản</div>
                            <div className="inputContent">
                                <input type="text"/>
                            </div>
                            <div className="inputField">Số diện thoại</div>
                            <div className="inputContent">
                                <input type="text"/>
                            </div>
                            <div className="inputField">Địa chỉ</div>
                            <div className="inputContent">
                                <input type="text"/>
                            </div>
                            <div className="inputField">Email</div>
                            <div className="inputContent">
                                <input type="text"/>
                            </div>
                        </div>
                    </div>
                    <div classsName="second-col-info inputBox">
                        <div className="date-picker">
                            There lie Date picker.
                        </div>
                        <div className="banking-info">
                            <div className="inputField">Tên tài khoản ngân hàng</div>
                            <div className="inputContent">
                                <input type="text"/>
                            </div>
                            <div className="inputField">Số tài khoản ngân hàng</div>
                            <div className="inputContent">
                                <input type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hello">Book</div>
            </div>
        )
    }
}

export default BookingForm;