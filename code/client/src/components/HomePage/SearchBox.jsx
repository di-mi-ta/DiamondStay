import React from 'react';
import '../../css/SearchBox.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      dateCome: undefined,
      dateLeave: undefined
    };
    this.handleDateComeChange = this.handleDateComeChange.bind(this);
    this.handleDateLeaveChange = this.handleDateLeaveChange.bind(this);
    this.ref = React.createRef();
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

  render() {
    return (
      <div className="searchBox container-fluid" ref={this.ref}>
        <div className="where inputBox">
          <div className="inputField">Nơi bạn muốn đến</div>
          <div className="inputContent">
            <input type="text" placeholder="Tìm kiếm"/>
          </div>
          <img src="https://www.luxstay.com/icons/earth.svg"></img>
        </div>
        <div className="calendar inputBox">
          <div className="inputField">Chọn lịch</div>
          <div className="inputContent">
            <DatePicker
              selected={this.state.dateCome}
              onChange={this.handleDateComeChange}
            />
            <DatePicker
              selected={this.state.dateLeave}
              onChange={this.handleDateLeaveChange}
            />
          </div>
          <img src="https://www.luxstay.com/icons/moon.svg"></img>
        </div>
        <div className="numOfGuests inputBox">
          <div className="inputField">Số khách</div>
          <div className="inputContent">
            <input type="number" placeholder="Số khách"/>
          </div>
          <img src="https://www.luxstay.com/icons/earth.svg"></img>
        </div>
        <button type="button" className="btn">Tìm kiếm</button>
      </div>
    );
  }

  componentDidMount() {
    const dateInputs = this.ref.current.querySelector('.calendar > .inputContent').childNodes;
    dateInputs[0].querySelector('input').placeholder = "Ngày đến";
    dateInputs[1].querySelector('input').placeholder = "Ngày đi";
  }
}

export default SearchBox;