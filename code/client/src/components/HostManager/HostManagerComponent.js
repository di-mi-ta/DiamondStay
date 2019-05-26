import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Menu} from 'antd';
import PromotionComponent from './HostPromotionsComponent';
import CalendarComponent from '../Common/CalendarComponent';
import HomepostManager from './HomepostManager';
import Reservation from '../Booking/ReservationComponent'
import Header from '../Header/HostHeader';
import '../../css/host/host-manager.css';
import MessageInbox from '../MessageInbox';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';

class HostManager extends Component{
    render() {
        return (
          <div>
            <Header />
            {this.props.auth.isAuthenticated ?
              <div>
            <Menu
              defaultSelectedKeys={['1']}
              mode= "horizontal"
              theme= 'light'
              style={{
                      textAlign: 'center',
                      background: "#d6ebff"
                    }}
            >
              <Menu.Item key="4">
                <Link to='/host/my-homes'>
                  <span> <b> Chỗ ở của tôi </b> </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to='/host/calendars'>
                  <span>
                    <b> Lịch </b>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to='/host/reservations'>
                  <span>
                    <b> Đặt phòng </b>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to='/host/host-promotions' >
                  <span><b>Khuyến mãi của tôi</b></span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6" >
                <Link to='/host/messages'>
                  <span> <b>Tin nhắn</b> </span>
                </Link>
              </Menu.Item>
            </Menu>
            <Switch>
              <Route path="/host/host-promotions" component={PromotionComponent}/>
              <Route path="/host/calendars" component={CalendarComponent}/>
              <Route path="/host/my-homes" component={HomepostManager}/>
              <Route path="/host/reservations" component={Reservation}/>
              <Route path="/host/messages" component={MessageInbox} />
              <Redirect to='/host/my-homes'/>
            </Switch>
            </div>
            : <div/>
          }
          </div>
        );
    }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(HostManager);
