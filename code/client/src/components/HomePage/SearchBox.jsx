import React from 'react';
import '../../css/SearchBox.css';
import '../../css/CheckBox.css';
import '../../css/Slider.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem, Collapse} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';
import update from 'immutability-helper';
import {connect} from 'react-redux';
import {search} from '../../utils/api/homepostSearch';
import * as actions from '../../redux/ActionCreators';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        dateCome: undefined,  // Date | undefined
        dateLeave: undefined, // Date | undefined

        // Homestay critera
        homestayName: undefined,
        homestayType: undefined,
        roomType: undefined,
        price: 0,
        numBed: 1,

        // Family criteria
        numGuests: 1,
        numChildren: 0,
        childrenChecked: false,
        extraBedChecked: false,
        noSmokingChecked: false,

        // Kitchen criteria
        electricKitchenChecked: false,
        gasKitchenChecked: false,
        microwaveChecked: false,
        freezerChecked: false,

        // Entertainment criteria
        forPetChecked: false,
        bbqAvailableChecked: false,
        niceViewChecked: false,
        toBeachChecked: false,
        nearGolfChecked: false,
        fishingChecked: false,
        poolAvailableChecked: false,
        barChecked: false,

        // Room criteria
        balconyChecked: false,

        // Convenience
        wifiChecked: false,
        tiviChecked: false,
        conditionerChecked: false,
        washerChecked: false,
        convenienceChecked: false,
        waterChecked: false,
        elevatorChecked: false,
        dryerChecked: false,

        // Highlight criteria
        projectorChecked: false,
        massagerChecked: false,
        smartTiviChecked: false,
      },
      ui: {
        homestayTypeDropdownOpen: false,        // homestay box
        criteriaDropdownOpen: false,        // critera box
        roomTypeDropdownOpen: false,
      }
    };
    this.ref = React.createRef();
  }

  componentDidMount() {
    // this component is renderred in 2 urls: / & /search?query=...
    if (this.props.location.pathname === '/search') {
      const query = this.convertQueryStringToState();
      this.setState({
        search: {
          ...this.state.search,
          ...query,
        }
      });
    }
  }

  handleSearch = () => {
    // TODO use utils/api/homepostSearch
    search(this.convertStateToQueryString())
    .then((homes) => {
      this.props.updateResultSearch(homes);
    }, err => console.log(err));
  }

  convertStateToQueryString = () => {
      const query = {...this.state.search};
      // Delete default values
      const dontCareValues = [
        undefined,  // text values
        '',         // text values
        false,      // checkboxes
      ];

      for (let prop in query) {
        if (dontCareValues.indexOf(query[prop]) !== -1) // this props contains dont care value
            delete query[prop];
      }

      // Serialize dateCome & dateLeave
      if (query.dateCome !== undefined) {
          query.dateCome = moment(query.dateCome).format('DD-MM-YYYY');
      }

      if (query.dateLeave !== undefined) {
          query.dateLeave = moment(query.dateLeave).format('DD-MM-YYYY');
      }
      return queryString.stringify(query);
  };

  convertQueryStringToState = () => {
    const queryInUrl = this.props.location.search;
    const query = queryString.parse(queryInUrl);

    // Deserialize date
    if (query.dateCome)
      query.dateCome = moment(query.dateCome, 'DD-MM-YYYY').toDate();
    if (query.dateLeave)
      query.dateLeave = moment(query.dateLeave, 'DD-MM-YYYY').toDate();

    return query;
  }

  handleHomepostNameChanged = (e) => {
    e.persist();
    this.setState(update(this.state, {
      search: {
        homestayName: {
          $set: e.target.value
        }
      }
    }));
  };

  handleChangeWithEvent = (prop, event) => {
    this.setState(update(this.state, {
      search: {
        [prop]: {
          $set: event.target.value
        }
      }
    }));
  };

  handleDateChange = (prop, newDate) => {
    this.setState(update(this.state, {
      search: {
        [prop]: {
          $set: newDate
        }
      }
    }));
  };

  handleCheckboxChange = (prop) => {
    this.setState(prevState => update(prevState, {
      search: {
        [prop]: {
          $apply: oldVal => !oldVal
        }
      }
    }))
  };

  handleToggle = (prop) => {
    this.setState(prevState => update(prevState, {
      ui: {
        [prop]: {
          $apply: oldVal => !oldVal
        }
      }
    }))
  };

  handleInnerTextDataChange = (prop, e) => {
    this.setState(update(this.state, {
      search: {
        [prop]: {
          $set: e.target.innerText
        }
      }
    }));
  }

  keepDropdown = (prop) => {
    this.handleCheckboxChange(prop);
    this.handleToggle('criteriaDropdownOpen');
  };

  MyDropdownCheckbox = ({ label, prop }) => (
    <DropdownItem onClick={() => this.keepDropdown(prop)}>
      {label}
      <input
        type='checkbox'
        checked={this.state.search[prop]}
        onChange={() => this.handleCheckboxChange(prop)}
        style={{ marginLeft: '5px' }}
      />
    </DropdownItem>
  );

  render() {
    console.clear();
    console.table(this.state.search)
    const MyDropdownCheckbox = this.MyDropdownCheckbox;
    return (
      <div className="searchBox" ref={this.ref}>
        <div className="searchBox-container container-fluid">
          <div className="where inputBox">
            <div className="inputField">Nơi bạn muốn đến</div>
            <div className="inputContent">
              <input type="text" placeholder="Tên homestay" value={this.state.search.homestayName} onChange={this.handleHomepostNameChanged} />
            </div>
            <img src="https://www.luxstay.com/icons/earth.svg"></img>
          </div>
          <div className="calendar inputBox">
            <div className="inputField">Chọn lịch</div>
            <div className="inputContent">
              <DatePicker
                selected={this.state.search.dateCome}
                placeholderText='Ngày đến'
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                onChange={newDate => this.handleDateChange('dateCome', newDate)}
              />
              <DatePicker
                selected={this.state.search.dateLeave}
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                placeholderText='Ngày đi'
                onChange={newDate => this.handleDateChange('dateLeave', newDate)}
              />
            </div>
            <img src="https://www.luxstay.com/icons/moon.svg"></img>
          </div>
          <div className="numOfGuests inputBox">
            <div className="inputField">Số khách</div>
            <div className="inputContent">
              <input type="number" value={this.state.search.numGuests} onChange={e => this.handleChangeWithEvent('numGuests', e)}/>
            </div>
            <img src="https://png.pngtree.com/svg/20170518/274aed119e.svg"></img>
          </div>
          <div className="numOfChildren inputBox">
            <div className="inputField">Số trẻ em</div>
            <div className="inputContent">
              <input type="number" value={this.state.search.numChildren} onChange={e => this.handleChangeWithEvent('numChildren', e)}/>
            </div>
            <img src="https://static.thenounproject.com/png/257710-200.png"></img>
          </div>

          <div className="priceValue inputBox">
            <div className="inputField">Tối đa {this.state.search.price}$ / đêm</div>
            <div className="inputContent">
              <input type="range" name="weight" min="0" max="5000" value={this.state.search.price} onChange={e => this.handleChangeWithEvent('price', e)} step="10"></input>
            </div>
            <img src="https://images.vexels.com/media/users/3/135829/isolated/preview/1a857d341d8b6dd31426d6a62a8d9054-dollar-coin-currency-icon-by-vexels.png"></img>
          </div>

          <div className="typeOfHomeStay inputBox">
            <div className="inputField">Loại HomeStay?</div>
              <Dropdown
                isOpen={this.state.ui.homestayTypeDropdownOpen}
                toggle={() => this.handleToggle('homestayTypeDropdownOpen')}>
                <DropdownToggle caret>{this.state.search.homestayType || 'Chọn loại homestay'}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={e => this.handleInnerTextDataChange('homestayType', e)}>Căn hộ dịch vụ</DropdownItem>
                  <DropdownItem onClick={e => this.handleInnerTextDataChange('homestayType', e)}>Biệt thự</DropdownItem>
                  <DropdownItem onClick={e => this.handleInnerTextDataChange('homestayType', e)}>Nhà riêng</DropdownItem>
                  <DropdownItem onClick={e => this.handleInnerTextDataChange('homestayType', e)}>Studio</DropdownItem>
                  <DropdownItem onClick={e => this.handleInnerTextDataChange('homestayType', e)}>Khác</DropdownItem>
                </DropdownMenu>
              </Dropdown>
          </div>

          <div className="typeOfRoom inputBox">
            <div className="inputField">Loại phòng?</div>
            <div className="inputContent">
              <Dropdown isOpen={this.state.ui.roomTypeDropdownOpen} toggle={() => this.handleToggle('roomTypeDropdownOpen')}>
                <DropdownToggle caret>{this.state.search.roomType || 'Chọn loại phòng'}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={e => this.handleInnerTextDataChange('roomType', e)}>Phòng riêng</DropdownItem>
                  <DropdownItem onClick={e => this.handleInnerTextDataChange('roomType', e)}>Nguyên căn</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <div className="bedBedRoomAndBathRoom inputBox">
            <div className="inputField">Số giường</div>
            <div className="inputContent">
              <input type="number" value={this.state.search.numBed} onChange={e => this.handleChangeWithEvent('numBed', e)}/>
            </div>
            <img src="https://www.luxstay.com/icons/earth.svg"></img>
            <img src="https://image.flaticon.com/icons/png/512/69/69524.png"></img>
          </div>

          <div className="otherCriteria inputBox">
            <div className="inputField">Các yêu cầu khác</div>
            <div className="inputContent">
              <Dropdown
                isOpen={this.state.ui.criteriaDropdownOpen}
                toggle={() => this.handleToggle('criteriaDropdownOpen')}>
                <DropdownToggle caret>Nhấn để xem tiêu chí</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Tiện ích gia đình</DropdownItem>
                  <MyDropdownCheckbox label='Phù hợp với trẻ nhỏ?' prop='childrenChecked' />
                  <MyDropdownCheckbox label='Đệm bổ sung' prop='extraBedChecked' />
                  <MyDropdownCheckbox label='Không hút thuốc?' prop='noSmokingChecked' />
                  <DropdownItem divider />

                  <DropdownItem header>Tiện ích bếp</DropdownItem>
                  <MyDropdownCheckbox label='Bếp điện' prop='electricKitchenChecked' />
                  <MyDropdownCheckbox label='Lò vi sóng' prop='microwaveChecked' />
                  <MyDropdownCheckbox label='Tủ lạnh' prop='freezerChecked' />
                  <MyDropdownCheckbox label='Bếp ga' prop='gasKitchenChecked' />
                  <DropdownItem divider />

                  <DropdownItem header>Tiện ích giải trí</DropdownItem>
                  <MyDropdownCheckbox label='Cho thú cưng' prop='forPetChecked' />
                  <MyDropdownCheckbox label='BBQ' prop='bbqAvailableChecked' />
                  <MyDropdownCheckbox label='Cảnh quan đẹp' prop='niceViewChecked' />
                  <MyDropdownCheckbox label='Hướng biển' prop='toBeachChecked' />
                  <MyDropdownCheckbox label='Gần sân golf' prop='nearGolfChecked' />
                  <MyDropdownCheckbox label='Câu cá' prop='fishingChecked' />
                  <MyDropdownCheckbox label='Bể bơi' prop='poolAvailableChecked' />
                  <MyDropdownCheckbox label='Quán bar' prop='barChecked' />
                  <DropdownItem divider />

                  <DropdownItem header>Tiện ích phòng</DropdownItem>
                  <MyDropdownCheckbox label='Ban công' prop='balconyChecked' />
                  <DropdownItem divider />

                  <DropdownItem header>Tiện nghi</DropdownItem>
                  <MyDropdownCheckbox label='Wifi' prop='wifiChecked' />
                  <MyDropdownCheckbox label='Tivi' prop='tiviChecked' />
                  <MyDropdownCheckbox label='Điều hoà' prop='conditionerChecked' />
                  <MyDropdownCheckbox label='Máy giặt' prop='washerChecked' />
                  <MyDropdownCheckbox label='Dầu gội, dầu xả, xà phòng tắm, giấy vệ sinh, khăn tắm, kem đánh răng, giấy ăn' prop='convenienceChecked' />
                  <MyDropdownCheckbox label='Nước khoáng' prop='waterChecked' />
                  <MyDropdownCheckbox label='Thang máy' prop='elevatorChecked' />
                  <MyDropdownCheckbox label='Máy sấy' prop='dryerChecked' />
                  <DropdownItem divider />

                  <DropdownItem header>Tiện nghi</DropdownItem>
                  <MyDropdownCheckbox label='Máy chiếu phim' prop='projectorChecked' />
                  <MyDropdownCheckbox label='Ghế massage' prop='massagerChecked' />
                  <MyDropdownCheckbox label='Smart tivi' prop='smartTiviChecked' />
                  <MyDropdownCheckbox label='Tủ đựng rượu' prop='barChecked' />
                  <DropdownItem divider />
                </DropdownMenu>
              </Dropdown>
            </div>
            <img src="http://www.clker.com/cliparts/5/d/c/2/12456876931527240042Soeb_Plain_Arrow_6.svg.hi.png"></img>
          </div>
        </div>
        <button type="button" className="btn" onClick={this.handleSearch}>
          <Link to={`/search?${this.convertStateToQueryString()}`}>
            Tìm kiếm
          </Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  updateResultSearch: (homes) => dispatch(actions.updateResultSearch(homes)),
});

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(SearchBox)))
