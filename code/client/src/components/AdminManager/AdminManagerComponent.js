import React, { Component } from 'react';
import {Menu, Row, Col, Divider } from 'antd';
import SystemPromotionComponent from './SystemPromotionComponent';
import CalendarComponent from '../Common/CalendarComponent';
import WaitingHomepostList from '../Common/WaitingHomepostComponent';
import {Link, Switch, Route} from 'react-router-dom';
import VerifyHomepostComponent from './VerifyHomePostComponent';
import VerifiedHomepostList from '../Common/VerifiedPostListComponent';

import Header from '../Header/HostHeader';
const SubMenu = Menu.SubMenu;

class AdminManager extends Component{
  render() {
    return (
      <div>
        <Header 
              auth={this.props.auth}
              loginUser={this.props.loginUser} 
              logoutUser={this.props.logoutUser} 
        />
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
            <span> <b>Tin nhắn</b> </span>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/admin/promotions" 
                render={() => <SystemPromotionComponent 
                                  promotions={this.props.promotions}
                                  deletePromo={this.props.deletePromo}
                                  fetchSystemPromos={this.props.fetchSystemPromos}
                                  fetchUpdateSystemPromo = {this.props.fetchUpdateSystemPromo}
                                  fetchDeleteSystemPromo = {this.props.fetchDeleteSystemPromo}
                                  fetchCreateSystemPromo = {this.props.fetchCreateSystemPromo}/>}/>
          <Route path="/admin/calendars" render={() => <CalendarComponent/>}/>
          <Route path="/admin/waiting-posts" 
                render={() => <WaitingHomepostList homeposts={this.props.homeposts}/>}/>
          <Route path="/admin/verified-posts" render={() => <VerifiedHomepostList 
                                  homeposts={this.props.homeposts}
                                  deletePromo={this.props.deletePromo}/>}/>
          <Route path='/admin/:homepostId' component={VerifyHomepostComponent} />
        </Switch>
        </div>
        : <div/> 
      }
      </div>
    );
  }
}

export default AdminManager;

