import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postRating, fetchHomeposts, fetchRatings, 
        fetchHostPromos, loginUser, logoutUser,
        fetchUpdateHostPromo, fetchDeleteHostPromo,
        fetchCreateHostPromo, fetchCreateSystemPromo, 
        fetchDeleteSystemPromo, fetchUpdateSystemPromo, 
        fetchSystemPromos, fetchUpdateHomepost, fetchCreateHomepost,
        updateCurrentHomepost} from '../redux/ActionCreators';
import AdminManager from '../components/AdminManager/AdminManagerComponent';
import HostManager from '../components/HostManager/HostManagerComponent';
import House from './Homestay/House';
import Home from "./HomeComponent";
import Footer from "./FooterComponent";
import Booking from "./BookingComponent";
import UpdatedHomepostManager from './HostManager/HomepostUpdate/UpdatedManager';
import HostHeader from './Header/HostHeader'

const mapStateToProps = state => {
    return {
      homeposts: state.homeposts,
      ratings: state.ratings,
      promotions: state.promotions,
      auth: state.auth /*info of user after login*/
    }
}

const mapDispatchToProps = (dispatch) => ({
  //login 
  /* creds: {username: '...', password: '...'}*/
  loginUser: (creds) => dispatch(loginUser(creds)),
  //logout 
  logoutUser: () => dispatch(logoutUser()),
  fetchUpdateHostPromo: (updatedPromo) => dispatch(fetchUpdateHostPromo(updatedPromo)),
  fetchDeleteHostPromo: (promoId) => dispatch(fetchDeleteHostPromo(promoId)),
  fetchCreateHostPromo: (promo) => dispatch(fetchCreateHostPromo(promo)),
  fetchUpdateSystemPromo: (updatedPromo) => dispatch(fetchUpdateSystemPromo(updatedPromo)),
  fetchDeleteSystemPromo: (promoId) => dispatch(fetchDeleteSystemPromo(promoId)),
  fetchCreateSystemPromo: (promo) => dispatch(fetchCreateSystemPromo(promo)),
  fetchHostPromos: (username) => {dispatch(fetchHostPromos(username))},
  fetchSystemPromos: () => {dispatch(fetchSystemPromos())},
  // get list homepost 
  fetchHomeposts: (query='') => {dispatch(fetchHomeposts(query))},
  fetchUpdateHomepost: (homepost) => {dispatch(fetchUpdateHomepost(homepost))},
  fetchCreateHomepost: (homepost) => {dispatch(fetchCreateHomepost(homepost))},
  updateCurrentHomepost: (homepost) => {dispatch(updateCurrentHomepost(homepost))},
  postRating: (homepostId, rating, comment) => dispatch(postRating(homepostId, rating, comment)),
  fetchRatings: () => {dispatch(fetchRatings())},
});

class Main extends Component {
  componentDidMount(){
    this.props.fetchHomeposts();
    this.props.fetchSystemPromos();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" 
                render={() => <Home 
                                auth={this.props.auth} 
                                loginUser={this.props.loginUser} 
                                logoutUser={this.props.logoutUser}
                                promotions={this.props.promotions}
                                homeposts={this.props.homeposts}
                                fetchSystemPromos={this.props.fetchSystemPromos}
                                fetchHomeposts = {this.props.fetchHomeposts}
                              />
                      }
          />
          <Route path="/host" 
                render={() => 
                            <HostManager 
                              auth={this.props.auth} 
                              loginUser={this.props.loginUser} 
                              logoutUser={this.props.logoutUser}
                              promotions={this.props.promotions}
                              homeposts={this.props.homeposts}
                              updateCurrentHomepost={this.props.updateCurrentHomepost}
                              fetchHostPromos={this.props.fetchHostPromos}
                              fetchUpdateHostPromo = {this.props.fetchUpdateHostPromo}
                              fetchDeleteHostPromo = {this.props.fetchDeleteHostPromo}
                              fetchCreateHostPromo = {this.props.fetchCreateHostPromo}
                              fetchHomeposts = {this.props.fetchHomeposts}
                              fetchCreateHomepost = {this.props.fetchCreateHomepost}
                              fetchUpdateHomepost = {this.props.fetchUpdateHomepost}
                            />
                        }/>
          <Route path="/admin" 
                render={() => <AdminManager auth={this.props.auth} 
                                            promotions={this.props.promotions}
                                            loginUser={this.props.loginUser} 
                                            logoutUser={this.props.logoutUser} 
                                            deletePromo={this.props.deletePromo}
                                            homeposts={this.props.homeposts}
                                            updateCurrentHomepost={this.props.updateCurrentHomepost}
                                            fetchHomeposts={this.props.fetchHomeposts}
                                            fetchCreateHomepost={this.props.fetchCreateHomepost}
                                            fetchUpdateHomepost={this.props.fetchUpdateHomepost}
                                            fetchSystemPromos={this.props.fetchSystemPromos}
                                            fetchUpdateSystemPromo = {this.props.fetchUpdateSystemPromo}
                                            fetchDeleteSystemPromo = {this.props.fetchDeleteSystemPromo}
                                            fetchCreateSystemPromo = {this.props.fetchCreateSystemPromo}
                              />}/>
          <Route path="/room/:homepostId" 
                render={() => <House/>}
          />
          <Route path="/properties" 
                render={() => 
                            <div>
                              <HostHeader 
                                auth={this.props.auth}
                                loginUser={this.props.loginUser} 
                                logoutUser={this.props.logoutUser} 
                              />
                              <UpdatedHomepostManager
                                  auth={this.props.auth} 
                                  loginUser={this.props.loginUser} 
                                  logoutUser={this.props.logoutUser}
                                  homeposts={this.props.homeposts}      
                                  fetchHomeposts={this.props.fetchHomeposts}
                                  fetchCreateHomepost={this.props.fetchCreateHomepost}
                                  fetchUpdateHomepost={this.props.fetchUpdateHomepost}
                                  updateCurrentHomepost={this.props.updateCurrentHomepost}
                              />
                            </div>
          }/>

          <Route path="/booking"
                  render={() => <Booking
                                  auth={this.props.auth} 
                                  loginUser={this.props.loginUser} 
                                  logoutUser={this.props.logoutUser}
                                  promotions={this.props.promotions}
                                  homeposts={this.props.homeposts}
                                  fetchSystemPromos={this.props.fetchSystemPromos}
                                  fetchHomeposts = {this.props.fetchHomeposts}
                              />}
          />
          <Redirect to='/home'/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
