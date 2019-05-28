import React from 'react';
import '../../css/SearchBox.css';
import '../../css/CheckBox.css';
import '../../css/Slider.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem, Collapse} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';
import { time as timeSerializer } from '../../utils/serialize';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homestayName: undefined,
      dateCome: undefined,
      dateLeave: undefined,
      numGuests: 1,
      numChildren: 0,
      priceValue: 10,
      homeStayOpen: false,
<<<<<<< HEAD
      homeStayValue: "Chọn loại HomeStay",
      roomOpen: false,
      roomValue: "Chọn loại phòng",
=======
      homeStayValue: undefined,
>>>>>>> 0291babd2c29c1f0af8e5b6118cb7f3fb55402a4
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

<<<<<<< HEAD
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
=======
  componentDidMount() {
    // this component is renderred in 2 urls: / & /search?query=...
    if (this.props.location.pathname === '/search') {
      const query = this.getQueryObject();
      console.log('mount', query);
      this.setState(query);
    }
  }

  handleSearch = () => {
    // TODO use utils/api/homepostSearch
    this.getQueryString();
  }

  // convert states to url's query string
  getQueryString = () => {
      const query = {...this.state};

      // Delete unwanted values
      delete query.criteriaOpen;
      const dontCareValues = [
        undefined, // text values
        '', // text values
        false,  // check boxes
      ];
      for (let prop in query) {
        if (dontCareValues.indexOf(query[prop]) !== -1) // this props contains dont care value
            delete query[prop];
      }

      // Reformat dateCome & dateLeave
      if (query.dateCome !== undefined) {
          query.dateCome = moment(query.dateCome).format('DD-MM-YYYY');
      }

      if (query.dateLeave !== undefined) {
          query.dateLeave = moment(query.dateLeave).format('DD-MM-YYYY');
      }
      return queryString.stringify(query);
  };

  // convert query string in url to object to pass to setState
  getQueryObject = () => {
    const query = queryString.parse(this.props.location.search);
    console.log(query);
    // Deserialize date
    if (query.dateCome)
      query.dateCome = moment(query.dateCome, 'DD-MM-YYYY').toDate();
    if (query.dateLeave)
      query.dateLeave = moment(query.dateLeave, 'DD-MM-YYYY').toDate();

    return query;
  }

  handleHomepostNameChanged = (e) => {
    e.persist();
    this.setState({
      homestayName: e.target.value
>>>>>>> 0291babd2c29c1f0af8e5b6118cb7f3fb55402a4
    });
  }

  handleNumChidlrenChanged(value){
    // if(value.target.value <= 5 && value.target.value >= 0)
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
    console.log('Is moment: ', date instanceof moment);
    console.log('Is Date: ', date instanceof Date)
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

  handleHomeStayValue(e){
    e.persist();
    this.setState({
      homeStayValue: e.target.innerText
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
    console.log('Render', this.state.dateCome);
    return (
      <div className="searchBox" ref={this.ref}>
        <div className="searchBox-container container-fluid">
          <div className="where inputBox">
            <div className="inputField">Nơi bạn muốn đến</div>
            <div className="inputContent">
              <input type="text" placeholder="Tên homestay" value={this.state.homestayName} onChange={this.handleHomepostNameChanged} />
            </div>
            <img src="https://www.luxstay.com/icons/earth.svg"></img>
          </div>
          <div className="calendar inputBox">
            <div className="inputField">Chọn lịch</div>
            <div className="inputContent">
              <DatePicker
                selected={this.state.dateCome}
                placeholderText='Ngày đến'
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                onChange={this.handleDateComeChange}
              />
              <DatePicker
                selected={this.state.dateLeave}
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                placeholderText='Ngày đi'
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
            <img src="https://png.pngtree.com/svg/20170518/274aed119e.svg"></img>
          </div>
          <div className="numOfChildren inputBox">
            <div className="inputField">Số trẻ em</div>
            <div className="inputContent">
              <input type="number" value={this.state.numChildren} onChange={this.numChildrenChanged}/>
            </div>
            <img src="https://static.thenounproject.com/png/257710-200.png"></img>
          </div>

          <div className="priceValue inputBox">
            <div className="inputField">Tối đa {this.state.priceValue}$ / đêm</div>
            <div className="inputContent">
              <input type="range" name="weight" min="10" max="100000" value={this.state.priceValue} onChange={this.changeValue} step="10"></input>
            </div>
            <img src="https://images.vexels.com/media/users/3/135829/isolated/preview/1a857d341d8b6dd31426d6a62a8d9054-dollar-coin-currency-icon-by-vexels.png"></img>
          </div>

          <div className="typeOfHomeStay inputBox">
            <div className="inputField">Loại HomeStay?</div>
<<<<<<< HEAD
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
=======
            <div className="inputContent">
              <Dropdown isOpen={this.state.homeStayOpen} toggle={this.homeStayToggle}>
                <DropdownToggle caret>{this.state.homeStayValue || 'Chọn loại homestay'}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.setHomeStayValue}>Căn hộ dịch vụ</DropdownItem>
                  <DropdownItem onClick={this.setHomeStayValue}>Biệt thự</DropdownItem>
                  <DropdownItem onClick={this.setHomeStayValue}>Nhà riêng</DropdownItem>
                  <DropdownItem onClick={this.setHomeStayValue}>Studio</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <img src="https://image.flaticon.com/icons/png/512/69/69524.png"></img>
>>>>>>> 0291babd2c29c1f0af8e5b6118cb7f3fb55402a4
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
            <div className="inputContent">
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
            <img src="http://www.clker.com/cliparts/5/d/c/2/12456876931527240042Soeb_Plain_Arrow_6.svg.hi.png"></img>
          </div>
        </div>
        <button type="button" className="btn" onClick={this.handleSearch}>
          <Link to={`/search?${this.getQueryString()}`}>
            Tìm kiếm
          </Link>
        </button>
      </div>
    );
  }
}
export default withRouter(SearchBox);
