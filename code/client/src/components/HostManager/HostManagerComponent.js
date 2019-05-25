import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {Menu} from 'antd';
import PromotionComponent from './HostPromotionsComponent';
import CalendarComponent from '../Common/CalendarComponent';
import HomepostManager from './HomepostManager';
import Reservation from '../Booking/ReservationComponent'
import Header from '../Header/HostHeader';


import '../../css/host/host-manager.css';
import MessageComponent from '../Host/MessageComponent';

class HostManager extends Component{
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
              {/* <Menu.Item key="1" to='/'>
                <Link to='/host/promotions'>
                  <span>
                    <b>Bảng thông tin</b>
                  </span>
                </Link>
              </Menu.Item> */}
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
              <Route path="/host/host-promotions" 
                    render={() => <PromotionComponent 
                                        auth={this.props.auth} 
                                        promotions={this.props.promotions}
                                        homeposts={this.props.homeposts}
                                        fetchHostPromos={this.props.fetchHostPromos}
                                        fetchHomeposts = {this.props.fetchHomeposts}
                                        fetchUpdateHostPromo = {this.props.fetchUpdateHostPromo}
                                        fetchDeleteHostPromo= {this.props.fetchDeleteHostPromo}
                                        fetchCreateHostPromo= {this.props.fetchCreateHostPromo}
                                  />}/>
              <Route path="/host/calendars" render={() => <CalendarComponent/>}/>
              <Route path="/host/my-homes" 
                     render={(location) => <HomepostManager 
                                        auth={this.props.auth}
                                        homeposts={this.props.homeposts}
                                        fetchHomeposts = {this.props.fetchHomeposts}
                                        fetchCreateHomepost = {this.props.fetchCreateHomepost}  
                                        fetchUpdateHomepost = {this.props.fetchUpdateHomepost}  
                                        currentHomepost={this.props.currentHomepost}
                                        updateCurrentHomepost={this.props.updateCurrentHomepost} 
                                        location={location}    
                                    />}/>
              <Route path="/host/reservations" 
                     render={() => <Reservation
                                    auth={this.props.auth}
                                    />}/>
              <Route
                path="/host/messages"
                component={MessageComponent}
              />
            </Switch>
            </div>
            : <div/> 
          }
          </div>
        );
    }
}

export default HostManager;