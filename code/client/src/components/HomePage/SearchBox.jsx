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
      homeStayValue: "Chọn loại HomeStay",
      roomOpen: false,
      roomValue: "Chọn loại phòng",
      poolAvailableChecked: false,
      numBed: 1,
      //family criteria
      childrenChecked: false,
      extraBedChecked: false,
      noSmokingChecked: false,
      //kitchen criteria
      electricKitchenChecked: false,
      microwaveChecked: false,
      freezerChecked: false,
      gasKitchenChecked: false,
      //entertainment criteria
      forPetChecked: false,
      bbqAvailableChecked: false,
      niceViewChecked: false,
      toBeachChecked: false,
      nearGolfChecked: false,
      fishingChecked: false,
      //room criteria
      balconyChecked: false,
      //convenience
      wifiChecked: false,
      tiviChecked: false,
      conditionerChecked: false,
      washerChecked: false,
      convenienceChecked: false,
      waterChecked: false,
      elevatorChecked: false,
      dryerChecked: false,
      //highlight criteria
      projectorChecked: false,
      massagerChecked: false,
      smartTiviChecked: false,
      barChecked: false,
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
    this.electricKitchenChecked = this.handleElectricKitchenChecked.bind(this);
    this.childrenChecked = this.handleChildrenChecked.bind(this);
    this.noSmokingChecked = this.handlenoSmokingChecked.bind(this);
    this.bbqAvailableChecked = this.handlebbqChecked.bind(this);
    this.niceViewChecked = this.handleNiceViewChecked.bind(this);
    this.poolAvailableChecked = this.handlePoolChecked.bind(this);
    this.changeValue = this.handleValueChanged.bind(this);
    this.numGuestsChanged = this.handleNumGuestsChanged.bind(this);
    this.numChildrenChanged = this.handleNumChidlrenChanged.bind(this);
    this.numBedChanged = this.handleNumBedChanged.bind(this);
    this.extraBedChecked = this.handleExtraBedChecked.bind(this);
    this.microwaveChecked = this.handleMicrowaveChecked.bind(this);
    this.freezerChecked = this.handleFreezerChecked.bind(this);
    this.gasKitchenChecked = this.handleGasKitchenChecked.bind(this);
    this.forPetChecked = this.handleForPetChecked.bind(this);
    this.toBeachChecked = this.handleToBeachChecked.bind(this);
    this.nearGolfChecked = this.handleNearGolfChecked.bind(this);
    this.fishingChecked = this.handleFishingChecked.bind(this);
    this.balconyChecked = this.handleBalconyChecked.bind(this);
    this.convenienceChecked = this.handleConvenienceChecked.bind(this);
    this.waterChecked = this.handleWaterChecked.bind(this);
    this.elevatorChecked = this.handleElevatorChecked.bind(this);
    this.dryerChecked = this.handleDryerChecked.bind(this);
    this.projectorChecked = this.handleProjectorChecked.bind(this);
    this.massagerChecked = this.handleMassagerChecked.bind(this);
    this.smartTiviChecked = this.handleSmartTiviChecked.bind(this);
    this.barChecked = this.handleBarChecked.bind(this);
    this.wifiChecked = this.handleWifiChecked.bind(this);
    this.tiviChecked = this.handleTiviChecked.bind(this);
    this.conditionerChecked = this.handleConditionerChecked.bind(this);
    this.washerChecked = this.handleWasherChecked.bind(this);
    Dropdown.propTypes = {
      isOpen: PropTypes.bool,
      toggle: PropTypes.func,
    };

    DropdownToggle.propTypes = {
      caret: PropTypes.bool,
      onClick: PropTypes.func
    };
    DropdownItem.propTypes = {
      header: PropTypes.bool
    };
  }

  handleWifiChecked(){
    this.setState({
      wifiChecked: !this.state.wifiChecked
    })
  }

  handleTiviChecked(){
    this.setState({
      tiviChecked: !this.state.tiviChecked
    })
  }

  handleConditionerChecked(){
    this.setState({
      conditionerChecked: !this.state.conditionerChecked
    })
  }

  handleWasherChecked(){
    this.setState({
      washerChecked: !this.state.washerChecked
    })
  }

  handleProjectorChecked(){
    this.setState({
      projectorChecked: !this.state.projectorChecked
    })
  }

  handleMassagerChecked(){
    this.setState({
      massagerChecked: !this.state.massagerChecked
    })
  }

  handleSmartTiviChecked(){
    this.setState({
      smartTiviChecked: !this.state.smartTiviChecked
    })
  }

  handleBarChecked(){
    this.setState({
      barChecked: !this.state.barChecked
    })

  }

  handleConvenienceChecked(){
    this.setState({
      convenienceChecked: !this.state.convenienceChecked
    })
  }

  handleWaterChecked(){
    this.setState({
      waterChecked: !this.state.waterChecked
    })
  }

  handleElevatorChecked(){
    this.setState({
      elevatorChecked: !this.state.elevatorChecked
    })
  }

  handleDryerChecked(){
    this.setState({
      dryerChecked: !this.state.dryerChecked
    })
  }
  handleBalconyChecked(){
    this.setState({
      balconyChecked: !this.state.balconyChecked
    })
  }

  handleFishingChecked(){
    this.setState({
      fishingChecked: !this.state.fishingChecked
    })
  }

  handleNearGolfChecked(){
    this.setState({
      nearGolfChecked: !this.state.nearGolfChecked
    })
  }

  handleToBeachChecked(){
    this.setState({
      toBeachChecked: !this.state.toBeachChecked
    })
  }

  handleForPetChecked(){
    this.setState({
      forPetChecked: !this.state.forPetChecked
    })
  }

  handleGasKitchenChecked(){
    this.setState({
      gasKitchenChecked: !this.state.gasKitchenChecked
    })
  }

  handleFreezerChecked(){
    this.setState({
      freezerChecked: !this.state.freezerChecked
    })
  }

  handleMicrowaveChecked(){
    this.setState({
      microwaveChecked: !this.state.microwaveChecked
    })
  }

  handleExtraBedChecked(){
    this.setState({
      extraBedChecked : !this.state.extraBedChecked
    });
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
    })
  }
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

  handleElectricKitchenChecked(){
    this.setState({
      electricKitchenChecked: !this.state.electricKitchenChecked
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
  handlebbqChecked(){
    this.setState({
      bbqAvailableChecked: !this.state.bbqAvailableChecked
    });
  }
  handlePoolChecked(){
    this.setState({
      poolAvailableChecked: !this.state.poolAvailableChecked
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
            <div className="inputContent">
              <Dropdown isOpen={this.state.criteriaOpen} toggle={this.criteriaToggle}>
                <DropdownToggle caret>Nhấn để xem tiêu chí</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Tiện ích gia đình</DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Phù hợp với trẻ nhỏ <input type="checkbox" onChange={this.childrenChecked} checked={this.state.childrenChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Đệm bổ sung <input type="checkbox" onChange={this.extraBedChecked} checked={this.state.extraBedChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Không hút thuốc <input type="checkbox" onChange={this.noSmokingChecked} checked={this.state.noSmokingChecked}/></DropdownItem>
                  <DropdownItem divider />

                  <DropdownItem header>Tiện ích bếp</DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Bếp điện <input type="checkbox" onChange={this.electricKitchenChecked} checked={this.state.electricKitchenChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Lò vi sóng <input type="checkbox" onChange={this.microwaveChecked} checked={this.state.microwaveChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Tủ lạnh <input type="checkbox" onChange={this.freezerChecked} checked={this.state.freezerChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Bếp ga <input type="checkbox" onChange={this.gasKitchenChecked} checked={this.state.gasKitchenChecked}/></DropdownItem>
                  <DropdownItem divider />

                  <DropdownItem header>Tiện ích giải trí</DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Cho thú cưng <input type="checkbox" onChange={this.forPetChecked} checked={this.state.forPetChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>BBQ <input type="checkbox" onChange={this.bbqAvailableChecked} checked={this.state.bbqAvailableChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Cảnh quan đẹp <input type="checkbox" onChange={this.niceViewChecked} checked={this.state.niceViewChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Hướng biển <input type="checkbox" onChange={this.toBeachChecked} checked={this.state.toBeachChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Gần sân golf <input type="checkbox" onChange={this.nearGolfChecked} checked={this.state.nearGolfChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Câu cá <input type="checkbox" onChange={this.fishingChecked} checked={this.state.fishingChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Bể bơi <input type="checkbox" onChange={this.poolAvailableChecked} checked={this.state.poolAvailableChecked}/></DropdownItem>
                  <DropdownItem divider />

                  <DropdownItem header>Tiện ích phòng</DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Ban công <input type="checkbox" onChange={this.balconyChecked} checked={this.state.balconyChecked}/></DropdownItem>
                  <DropdownItem divider />

                  <DropdownItem header>Tiện nghi</DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Wifi <input type="checkbox" onChange={this.wifiChecked} checked={this.state.wifiChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Tivi <input type="checkbox" onChange={this.tiviChecked} checked={this.state.tiviChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Điều hòa <input type="checkbox" onChange={this.conditionerChecked} checked={this.state.conditionerChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Máy giặt <input type="checkbox" onChange={this.washerChecked} checked={this.state.washerChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Dầu gội, dầu xả, xà phòng tắm, giấy vệ sinh, khăn tắm, kem đánh răng, giấy ăn <input type="checkbox" onChange={this.convenienceChecked} checked={this.state.convenienceChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Nước khoáng <input type="checkbox" onChange={this.waterChecked} checked={this.state.waterChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Thang máy <input type="checkbox" onChange={this.elevatorChecked} checked={this.state.elevatorChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Máy sấy <input type="checkbox" onChange={this.dryerChecked} checked={this.state.dryerChecked}/></DropdownItem>
                  <DropdownItem divider />

                  <DropdownItem header>Tiện nghi</DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Máy chiếu phim <input type="checkbox" onChange={this.projectorChecked} checked={this.state.projectorChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Ghế massage <input type="checkbox" onChange={this.massagerChecked} checked={this.state.massagerChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Smart tivi <input type="checkbox" onChange={this.smartTiviChecked} checked={this.state.smartTiviChecked}/></DropdownItem>
                  <DropdownItem onClick={this.keepingDropdown}>Tủ đựng rượu <input type="checkbox" onChange={this.barChecked} checked={this.state.barChecked}/></DropdownItem>
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
