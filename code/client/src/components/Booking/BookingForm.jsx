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
                    <div className="inputBox">
                        <div className="first-row-info">
                            <div className="homestay-info">
                                There lie homestay information.
                            </div>
                            <div className="user-info">
                                There lie User information.
                            </div>
                        </div>
                        <div classsName="second-row-info">
                            <div className="date-picker">
                                There lie Date picker.
                            </div>
                            <div className="banking-info">
                                There lie banking info.
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" searchBox container-fluid">Book</div>
            </div>
        )
    }
}

export default BookingForm;