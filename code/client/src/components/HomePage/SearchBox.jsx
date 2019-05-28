import React from 'react';
import '../../css/SearchBox.css';
import '../../css/CheckBox.css';
import '../../css/Slider.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem, Collapse} from 'reactstrap';
import PropTypes from 'prop-types';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateCome: undefined,
      dateLeave: undefined,
      numGuests: 1,
      numChildren: 0,
      priceValue: 10,
      homeStayOpen: false,
      homeStayValue: "Chọn loại HomeStay",
      roomOpen: false,
      roomValue: "Chọn loại phòng",
      kitchenChecked: false,
      childrenChecked: false,
      noSmokingChecked: false,
      barAvailableChecked: false,
      niceViewChecked: false,
      poolAvailableChecked: false,
      gymAvailableChecked: false,
      wifiAvailableChecked: false,
      numBed: 1
    };
    this.handleDateComeChange = this.handleDateComeChange.bind(this);
    this.handleDateLeaveChange = this.handleDateLeaveChange.bind(this);
    this.ref = React.createRef();
    this.homeStayToggle = this.handleHomeStayToggle.bind(this);
    this.roomToggle = this.handleRoomToggle.bind(this);
    this.setRoomValue = this.handleRoomValue.bind(this);
    this.setHomeStayValue = this.handleHomeStayValue.bind(this);
    this.criteriaToggle = this.handleCriteriaToggle.bind(this);
    this.keepingDropdown = this.handleKeepingDropdown.bind(this);
    this.kitchenChecked = this.handleKitchenChecked.bind(this);
    this.childrenChecked = this.handleChildrenChecked.bind(this);
    this.noSmokingChecked = this.handlenoSmokingChecked.bind(this);
    this.barAvailableChecked = this.handleBarChecked.bind(this);
    this.niceViewChecked = this.handleNiceViewChecked.bind(this);
    this.poolAvailableChecked = this.handlePoolChecked.bind(this);
    this.gymAvailableChecked = this.handleGymChecked.bind(this);
    this.wifiAvailableChecked = this.handleWifiChecked.bind(this);
    this.changeValue = this.handleValueChanged.bind(this);
    this.numGuestsChanged = this.handleNumGuestsChanged.bind(this);
    this.numChildrenChanged = this.handleNumChidlrenChanged.bind(this);
    this.numBedChanged = this.handleNumBedChanged.bind(this);
    Dropdown.propTypes = {
      isOpen: PropTypes.bool,
      toggle: PropTypes.func,
    };
    
    DropdownToggle.propTypes = {
      caret: PropTypes.bool,
      onClick: PropTypes.func
    };
  }

  handleNumBedChanged(value){
    if(value.target.value <= 3 && value.target.value >= 1)
      this.setState({
        numBed: value.target.value
      });
  }

  handleRoomToggle() {
    this.setState(prevState => ({
      roomOpen: !prevState.roomOpen
    }));
  }

  handleRoomValue(value){
    this.setState({
      roomValue: value.target.innerText
    });
  }

  handleNumChidlrenChanged(value){
    if(value.target.value <= 5 && value.target.value >= 0)
      this.setState({
        numChildren: value.target.value
      });
  }

  handleNumGuestsChanged(value){
    if(value.target.value <= 10 && value.target.value >= 0)
      this.setState({
        numGuests: value.target.value
      });
  }

  handleValueChanged(value){
    this.setState({
      priceValue: value.target.value
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

  handleHomeStayToggle() {
    this.setState(prevState => ({
      homeStayOpen: !prevState.homeStayOpen
    }));
  }

  handleHomeStayValue(value){
    this.setState({
      homeStayValue: value.target.innerText
    });
  }

  handleCriteriaToggle(){
    this.setState(prevState => ({
      criteriaOpen: !prevState.criteriaOpen
    }));
  }

  handleKeepingDropdown(){
    this.setState({
      criteriaOpen: !this.state.criteriaOpen
    });
  }

  handleKitchenChecked(){
    this.setState({
      kitchenChecked: !this.state.kitchenChecked
    });
  }

  handleChildrenChecked(){
    this.setState({
      childrenChecked: !this.state.childrenChecked
    });
  }
  handlenoSmokingChecked(){
    this.setState({
      noSmokingChecked: !this.state.noSmokingChecked
    });
  }
  handleBarChecked(){
    this.setState({
      barAvailableChecked: !this.state.barAvailableChecked
    });
  }
  handlePoolChecked(){
    this.setState({
      poolAvailableChecked: !this.state.poolAvailableChecked
    });
  }
  handleGymChecked(){
    this.setState({
      gymAvailableChecked: !this.state.gymAvailableChecked
    });
  }
  handleWifiChecked(){
    this.setState({
      wifiAvailableChecked: !this.state.wifiAvailableChecked
    });
  }

  handleNiceViewChecked(){
    this.setState({
      niceViewChecked: !this.state.niceViewChecked
    });
  }
  render() {
    return (
      <div className="huge-input-container" ref={this.ref}>
        <div className="searchBox container-fluid">
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
              <input type="number" value={this.state.numGuests} onChange={this.numGuestsChanged}/>
            </div>
            <img src="https://www.luxstay.com/icons/earth.svg"></img>
          </div>
          <button type="button" className="btn">Tìm kiếm</button>
        </div>
        <div className="searchBox container-fluid">

          <div className="numOfChildren inputBox">
            <div className="inputField">Số trẻ em</div>
            <div className="inputContent">
              <input type="number" value={this.state.numChildren} onChange={this.numChildrenChanged}/>
            </div>
            <img src="https://www.luxstay.com/icons/earth.svg"></img>
          </div>

          <div className="priceValue inputBox">
            <div className="inputField">Tối đa {this.state.priceValue}$ / đêm</div>
            <input type="range" name="weight" min="10" max="100000" value={this.state.priceValue} onChange={this.changeValue} step="10"></input>
            <img src="https://www.luxstay.com/icons/earth.svg"></img>
          </div>

          <div className="typeOfHomeStay inputBox">
            <div className="inputField">Loại HomeStay?</div>
            <Dropdown isOpen={this.state.homeStayOpen} toggle={this.homeStayToggle}>
              <DropdownToggle caret>{this.state.homeStayValue}</DropdownToggle>
              <DropdownMenu>
              <DropdownItem onClick={this.setHomeStayValue}>Khác</DropdownItem>
                <DropdownItem onClick={this.setHomeStayValue}>Căn hộ Studio</DropdownItem>
                <DropdownItem onClick={this.setHomeStayValue}>Nhà riêng</DropdownItem>
                <DropdownItem onClick={this.setHomeStayValue}>Chung cư</DropdownItem>
                <DropdownItem onClick={this.setHomeStayValue}>Biệt thự</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div className="inputField">Loại phòng?</div>
            <Dropdown isOpen={this.state.roomOpen} toggle={this.roomToggle}>
              <DropdownToggle caret>{this.state.roomValue}</DropdownToggle>
              <DropdownMenu>
              <DropdownItem onClick={this.setRoomValue}>Phòng riêng</DropdownItem>
                <DropdownItem onClick={this.setRoomValue}>Nguyên căn</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="bedBedRoomAndBathRoom inputBox">
            <div className="inputField">Số giường</div>
            <div className="inputContent">
              <input type="number" value={this.state.numBed} onChange={this.numBedChanged}/>
            </div>
            <img src="https://www.luxstay.com/icons/earth.svg"></img>
          </div>

          <div className="otherCriteria inputBox">
            <div className="inputField">Các yêu cầu khác</div>
            <Dropdown isOpen={this.state.criteriaOpen} toggle={this.criteriaToggle}>
              <DropdownToggle caret>Nhấn để xem tiêu chí</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.keepingDropdown}>Có bếp? <input type="checkbox" onChange={this.kitchenChecked} checked={this.state.kitchenChecked}/></DropdownItem>
                <DropdownItem onClick={this.keepingDropdown}>Phù hợp với trẻ nhỏ? <input type="checkbox" onChange={this.childrenChecked} checked={this.state.childrenChecked}/></DropdownItem>
                <DropdownItem onClick={this.keepingDropdown}>Không hút thuốc? <input type="checkbox" onChange={this.noSmokingChecked} checked={this.state.noSmokingChecked}/></DropdownItem>
                <DropdownItem onClick={this.keepingDropdown}>Có bar? <input type="checkbox" onChange={this.barAvailableChecked} checked={this.state.barAvailableChecked}/></DropdownItem>
                <DropdownItem onClick={this.keepingDropdown}>Cảnh quan đẹp? <input type="checkbox" onChange={this.niceViewChecked} checked={this.state.niceViewChecked}/></DropdownItem>
                <DropdownItem onClick={this.keepingDropdown}>Có bể bơi? <input type="checkbox" onChange={this.poolAvailableChecked} checked={this.state.poolAvailableChecked}/></DropdownItem>
                <DropdownItem onClick={this.keepingDropdown}>Có phòng tập? <input type="checkbox" onChange={this.gymAvailableChecked} checked={this.state.gymAvailableChecked}/></DropdownItem>
                <DropdownItem onClick={this.keepingDropdown}>Có wifi? <input type="checkbox" onChange={this.wifiAvailableChecked} checked={this.state.wifiAvailableChecked}/></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
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