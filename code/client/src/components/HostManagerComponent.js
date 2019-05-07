import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {Menu} from 'antd';

const SubMenu = Menu.SubMenu;

class HostManager extends Component{
    render() {
        return (
          <div>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode= "horizontal"
              theme= 'dark'
              style={{marginBottom: '30px'}}
            >
              <Menu.Item key="1" to='/'>
                <span><Link to='/admin/promotions' style={{color: 'white' }}> <b>Bảng thông tin</b> </Link></span>
              </Menu.Item>
              <Menu.Item key="2">
                <span><Link to='/admin/calendars' style={{color: 'white' }}> <b> Lịch </b> </Link></span>
              </Menu.Item>
              <Menu.Item key="3">
                <span><Link to='/admin/calendars' style={{color: 'white' }}> <b> Chỗ ở của tôi </b> </Link></span>
              </Menu.Item>
              <SubMenu key="sub1" title={<span><b>Khuyến mãi</b></span>}>
                <Menu.Item key="4">
                  <span><Link to='/admin/waiting-posts' style={{color: 'white' }}> <b>Khuyến mãi của hệ thống</b> </Link></span>
                </Menu.Item>
                <Menu.Item key="5">
                  <span><Link to='/admin/verified-posts' style={{color: 'white' }}> <b>Khuyến mãi của tôi</b> </Link></span>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="6">
                <span> <b>Tin nhắn</b> </span>
              </Menu.Item>
            </Menu>
            {/* <Switch>
              <Route path="/admin/promotions" 
                    render={() => <PromotionComponent promotions={this.props.promotions}/>}/>
              <Route path="/admin/calendars" render={() => <CalendarComponent/>}/>
              <Route path="/admin/waiting-posts" 
                    render={() => <WaitingHomepostList homeposts={this.props.homeposts}/>}/>
              <Route path="/admin/verified-posts" render={() => <div></div>}/>
            </Switch> */}
          </div>
        );
    }
}

export default HostManager;