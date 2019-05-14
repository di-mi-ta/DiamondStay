import React, { Component } from 'react';
import {Menu, Row, Col, Divider } from 'antd';
import SystemPromotionComponent from './SystemPromotionComponent';
import CalendarComponent from './CalendarComponent';
import WaitingHomepostList from './WaitingHomepostComponent';
import {Link, Switch, Route} from 'react-router-dom';
import VerifyHomepostComponent from './VerifyHomePostComponent';
import VerifiedHomepostList from './VerifiedPostListComponent';
const SubMenu = Menu.SubMenu;

class AdminManager extends Component{
  render() {
    return (
      <div className='container'>
        <Menu
          defaultSelectedKeys={['1']}
          mode= "horizontal"
          theme= 'light'
          style={{marginBottom: '30px',textAlign: 'center', background: "#d6ebff"}}
        >
          <Menu.Item key="1" style={{Right: '20px'}}>
            <span>
              <Link to='/admin/promotions' style={{color: 'black' }}> 
                <b>Quản lí khuyến mãi</b> 
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>
              <Link to='/admin/calendars' style={{color: 'black' }}> 
                <b> Lịch </b> 
              </Link>
            </span>
          </Menu.Item>
          <SubMenu key="sub1"  style={{color: 'black' }} title={<span><b>Quản lí tin đăng</b></span>}>
            <Menu.Item key="3">
              <span>
                <Link to='/admin/waiting-posts' style={{color: 'black' }}> 
                  <b>Tin chưa duyệt</b> 
                </Link>
              </span>
            </Menu.Item>
            <Menu.Item key="4">
              <span>
                <Link to='/admin/verified-posts' style={{color: 'black' }}> 
                  <b>Tin đã duyệt</b> 
                </Link>
              </span>
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
                                  deletePromo={this.props.deletePromo}/>}/>
          <Route path="/admin/calendars" render={() => <CalendarComponent/>}/>
          <Route path="/admin/waiting-posts" 
                render={() => <WaitingHomepostList homeposts={this.props.homeposts}/>}/>
          <Route path="/admin/verified-posts" render={() => <VerifiedHomepostList 
                                  homeposts={this.props.homeposts}
                                  deletePromo={this.props.deletePromo}/>}/>
          <Route path='/admin/:homepostId' component={VerifyHomepostComponent} />
        </Switch>
      </div>
    );
  }
}

export default AdminManager;

