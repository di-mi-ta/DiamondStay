import React, { Component } from 'react';
import {Menu} from 'antd';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import Header from '../Header/HostHeader';
import {connect} from 'react-redux';
import MyBooking from './MyBooking';
import DiamondCoin from './DiamondCoin';
import MessageInbox from '../MessageInbox';
import UserProfilePage from '../single-pages/UserProfilePage';


class RenterManager extends Component{
  render() {
    return (
      <div>
        <Header />
        {this.props.auth.isAuthenticated ?
        <div>
        <Menu
          defaultSelectedKeys={['1']}
          mode= "horizontal"
          style={{
            textAlign: 'center',
            boxShadow: '0 8px 12px rgba(0,0,0,.1)',
          }}
        >
          <Menu.Item key="1" style={{Right: '20px'}}>
              <Link to='/me/booking' style={{color: 'black' }}>
                <span>
                  <b>Đặt chỗ của tôi</b>
                </span>
              </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/me/inbox' style={{color: 'black' }}>
              <span>
                <b>Tin nhắn</b>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/me/setting' style={{color: 'black' }}>
              <span>
                <b>Cài đặt tài khoản</b>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to='/me/coin' style={{color: 'black' }}>
              <span>
                <b>Diamond Coin</b>
              </span>
            </Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/me/booking" component={MyBooking}/>
          <Route path="/me/inbox" component={MessageInbox}/>
          <Route path="/me/coin" component={DiamondCoin}/>
          <Route path="/me/setting" component={UserProfilePage}/>
          <Redirect to="/me/booking"/>
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

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RenterManager);
