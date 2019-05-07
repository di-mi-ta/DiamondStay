import React, { Component } from 'react';
import {Menu} from 'antd';
import PromotionComponent from './PromotionsComponent';
import CalendarComponent from './CalendarComponent';
import WaitingHomepostList from './WaitingHomepostComponent';
import {Link, Switch, Route} from 'react-router-dom';
import VerifyHomepostComponent from './VerifyHomePostComponent';

const SubMenu = Menu.SubMenu;

class AdminManager extends Component{
  render() {
    return (
      <div>
        <Menu
          defaultSelectedKeys={['1']}
          mode= "horizontal"
          theme= 'dark'
          style={{marginBottom: '30px', paddingLeft: '40px'}}
        >
          <Menu.Item key="1" style={{Right: '20px'}}>
            <span><Link to='/admin/promotions' style={{color: '#DBD4D7' }}> <b>Quản lí khuyến mãi</b> </Link></span>
          </Menu.Item>
          <Menu.Item key="2">
            <span><Link to='/admin/calendars' style={{color: '#DBD4D7' }}> <b> Lịch </b> </Link></span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><b>Quản lí tin đăng</b></span>}>
            <Menu.Item key="3">
              <span><Link to='/admin/waiting-posts' style={{color: '#DBD4D7' }}> <b>Tin chưa duyệt</b> </Link></span>
            </Menu.Item>
            <Menu.Item key="4">
              <span><Link to='/admin/verified-posts' style={{color: '#DBD4D7' }}> <b>Tin đã duyệt</b> </Link></span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <span> <b>Tin nhắn</b> </span>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/admin/promotions" 
                render={() => <PromotionComponent 
                                  promotions={this.props.promotions}
                                  deletePromo={this.props.deletePromo}/>}/>
          <Route path="/admin/calendars" render={() => <CalendarComponent/>}/>
          <Route path="/admin/waiting-posts" 
                render={() => <WaitingHomepostList homeposts={this.props.homeposts}/>}/>
          <Route path="/admin/verified-posts" render={() => <div></div>}/>
          <Route path='/admin/:homepostId' component={VerifyHomepostComponent} />
        </Switch>
      </div>
    );
  }
}



export default AdminManager;

