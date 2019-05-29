import React, { Component } from 'react';
import {Menu} from 'antd';
import SystemPromotionComponent from './SystemPromotionComponent';
import CalendarComponent from '../Common/CalendarComponent';
import WaitingHomepostList from '../Common/WaitingHomepostComponent';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import VerifyHomepostComponent from './VerifyHomePostComponent';
import VerifiedHomepostList from '../Common/VerifiedPostListComponent';
import Header from '../Header/HostHeader';
import {connect} from 'react-redux';
import MessageInbox from '../MessageInbox';

const SubMenu = Menu.SubMenu;

class AdminManager extends Component{
  render() {
    return (
      <div>
        <Header />
        {this.props.auth.isAuthenticated ?
        <div>
        <Menu
          defaultSelectedKeys={['1']}
          mode= "horizontal"
          // theme= 'light'
          style={{
            textAlign: 'center',
            boxShadow: '0 8px 12px rgba(0,0,0,.1)',
          }}
        >
          <Menu.Item key="1" style={{Right: '20px'}}>
              <Link to='/admin/promotions' style={{color: 'black' }}>
                <span>
                  <b>Quản lí khuyến mãi</b>
                </span>
              </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/admin/calendars' style={{color: 'black' }}>
              <span>
                <b> Lịch </b>
              </span>
            </Link>
          </Menu.Item>
          <SubMenu key="sub1"  style={{color: 'black'}}
                              title={<span><b>Quản lí tin đăng</b></span>}>
            <Menu.Item key="3">
              <Link to='/admin/waiting-posts' style={{color: 'black' }}>
                <span>
                  <b>Tin chưa duyệt</b>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='/admin/verified-posts' style={{color: 'black' }}>
                <span>
                  <b>Tin đã duyệt</b>
                </span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5" style={{color: 'black' }}>
            <Link to='/admin/messages' style={{color: 'black' }}>
                <span>
                  <b>Tin nhắn</b>
                </span>
              </Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/admin/promotions" component={SystemPromotionComponent}/>
          <Route path="/admin/calendars" component={CalendarComponent}/>
          <Route path="/admin/waiting-posts" component={WaitingHomepostList}/>
          <Route path="/admin/verified-posts" component={VerifiedHomepostList}/>
          <Route path="/admin/messages" component={MessageInbox}/>
          <Route path='/admin/:homepostId' component={VerifyHomepostComponent}/>
          <Redirect to="/admin/promotions"/>
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminManager);
