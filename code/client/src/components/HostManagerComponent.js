import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {Menu} from 'antd';
import PromotionComponent from './PromotionsComponent';
import CalendarComponent from './CalendarComponent';

const SubMenu = Menu.SubMenu;

class HostManager extends Component{
    render() {
        return (
          <div className='container' style= {{backgroundColor: "#F1F1F1"}}>
            <Menu
              defaultSelectedKeys={['1']}
              mode= "horizontal"
              theme= 'light'
              style={{marginBottom: '30px', textAlign: 'center', 
                      background: "#d6ebff",
                    }}
            >
              <Menu.Item key="1" to='/'>
                <span><Link style={{color: 'black' }}  to='/host/promotions'><b>Bảng thông tin</b> </Link></span>
              </Menu.Item>
              <Menu.Item key="2">
                <span><Link style={{color: 'black' }} to='/host/calendars'> <b> Lịch </b> </Link></span>
              </Menu.Item>
              <Menu.Item key="3">
                <span><Link style={{color: 'black' }} to='/host'> <b> Chỗ ở của tôi </b> </Link></span>
              </Menu.Item>
              <SubMenu key="sub1" style={{color: 'black' }} title={<span><b>Khuyến mãi</b></span>}>
                <Menu.Item key="4">
                  <span><Link to='/host' style={{color: 'black' }}> <b>Khuyến mãi của hệ thống</b> </Link></span>
                </Menu.Item>
                <Menu.Item key="5">
                  <span><Link to='/host/host-promotions' style={{color: 'black' }}> <b>Khuyến mãi của tôi</b> </Link></span>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="6" style={{color: 'black' }}>
                <span> <b>Tin nhắn</b> </span>
              </Menu.Item>
            </Menu>
            <Switch>
              <Route path="/host/host-promotions" 
                    render={() => <PromotionComponent auth={this.props.auth} 
                                                      promotions={this.props.promotions}
                                                      fetchHostPromos={this.props.fetchHostPromos}
                                                      fetchUpdateHostPromo = {this.props.fetchUpdateHostPromo}
                                                      fetchDeleteHostPromo= {this.props.fetchDeleteHostPromo}
                                                      fetchCreateHostPromo= {this.props.fetchCreateHostPromo}
                                  />}/>
              <Route path="/host/calendars" render={() => <CalendarComponent/>}/>
            </Switch>
          </div>
        );
    }
}

export default HostManager;