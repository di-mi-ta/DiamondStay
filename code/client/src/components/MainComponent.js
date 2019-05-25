import React, { Component } from 'react';
<<<<<<< HEAD
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
import UpdatedHomepostManager from './HostManager/HomepostUpdate/UpdatedManager';
import HostHeader from './Header/HostHeader'
=======
import {Switch, Route, Redirect, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {postRating, fetchHomeposts, fetchRatings, 
        fetchHostPromos, loginUser, logoutUser, fetchFavorites, 
        postFavorite, deleteFavorite, deletePromo,
        fetchUpdateHostPromo, fetchDeleteHostPromo,
        fetchCreateHostPromo, fetchCreateSystemPromo, fetchDeleteSystemPromo,
        fetchUpdateSystemPromo, fetchSystemPromos, fetchCreateHomepost,
        fetchUpdateHomepost} from '../redux/ActionCreators';
import AdminManager from '../components/AdminManagerComponent';
import HostManager from '../components/HostManagerComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
>>>>>>> tan-branch

const mapStateToProps = state => {
    return {
      homeposts: state.homeposts,
      ratings: state.ratings,
      promotions: state.promotions,
      auth: state.auth /*info of user after login*/
    }
}

const mapDispatchToProps = (dispatch) => ({
<<<<<<< HEAD
  //login 
  /* creds: {username: '...', password: '...'}*/
=======
>>>>>>> tan-branch
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
<<<<<<< HEAD
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
=======
  fetchHomeposts: () => {dispatch(fetchHomeposts())},
  fetchCreateHomepost: (homepost) => {dispatch(fetchCreateHomepost(homepost))},
  fetchUpdateHomepost: (homepost) => {dispatch(fetchUpdateHomepost(homepost))},
  
  //////////////////////////////////////////////////////////////////////////////////////////////
  postRating: (homepostId, rating, comment) => dispatch(postRating(homepostId, rating, comment)),
  fetchRatings: () => {dispatch(fetchRatings())},
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (homepostId) => dispatch(postFavorite(homepostId)),
  deleteFavorite: (homepostId) => dispatch(deleteFavorite(homepostId))
});

class Main extends Component {
  componentDidMount() {
    //this.props.fetchHomeposts();
    //this.props.fetchRatings();
    //this.props.fetchFavorites();
>>>>>>> tan-branch
  }
  render() {
    return (
      <div>
        <Switch>
<<<<<<< HEAD
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
          <Redirect to='/home'/>
=======
          <Route path="/host" 
                render={() => <HostManager  
                                    auth={this.props.auth} 
                                    loginUser={this.props.loginUser} 
                                    logoutUser={this.props.logoutUser}
                                    promotions={this.props.promotions}
                                    homeposts={this.props.homeposts}
                                    fetchHostPromos={this.props.fetchHostPromos}
                                    fetchUpdateHostPromo = {this.props.fetchUpdateHostPromo}
                                    fetchDeleteHostPromo = {this.props.fetchDeleteHostPromo}
                                    fetchCreateHostPromo = {this.props.fetchCreateHostPromo}
                                    fetchHomeposts = {this.props.fetchHomeposts}
                                    fetchCreateHomepost = {fetchCreateHomepost}
                                    fetchUpdateHomepost = {fetchUpdateHomepost}
                              />}/>
          <Route path="/admin" 
                render={() => <AdminManager 
                                    auth={this.props.auth} 
                                    promotions={this.props.promotions}
                                    loginUser={this.props.loginUser} 
                                    logoutUser={this.props.logoutUser} 
                                    deletePromo={this.props.deletePromo}
                                    homeposts={this.props.homeposts}
                                    fetchSystemPromos={this.props.fetchSystemPromos}
                                    fetchUpdateSystemPromo = {this.props.fetchUpdateSystemPromo}
                                    fetchDeleteSystemPromo = {this.props.fetchDeleteSystemPromo}
                                    fetchCreateSystemPromo = {this.props.fetchCreateSystemPromo}
                                    fetchHomeposts = {this.props.fetchHomeposts}
                                    fetchCreateHomepost = {fetchCreateHomepost}
                                    fetchUpdateHomepost = {fetchUpdateHomepost}
                              />}/>
          <Route path="/home" 
                render={() => <div>
                                  <Header auth={this.props.auth} 
                                        promotions={this.props.promotions}
                                        loginUser={this.props.loginUser} 
                                        logoutUser={this.props.logoutUser} 
                                        fetchHostPromos={this.props.fetchHostPromos}
                                        fetchUpdateHostPromo = {this.props.fetchUpdateHostPromo}
                                        fetchDeleteHostPromo = {this.props.fetchDeleteHostPromo}
                                        fetchCreateHostPromo = {this.props.fetchCreateHostPromo}
                                  />
                              </div>
                        }/>
          <Redirect to="/home" />
>>>>>>> tan-branch
        </Switch>
        <Footer/>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
