import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {postRating, fetchHomeposts, fetchRatings, 
        fetchHostPromos, loginUser, logoutUser, fetchFavorites, 
        postFavorite, deleteFavorite, deletePromo,
        fetchUpdateHostPromo, fetchDeleteHostPromo,
        fetchCreateHostPromo, fetchCreateSystemPromo, fetchDeleteSystemPromo,
        fetchUpdateSystemPromo, fetchSystemPromos} from '../redux/ActionCreators';
import AdminManager from '../components/AdminManagerComponent';
import HostManager from '../components/HostManagerComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

const mapStateToProps = state => {
    return {
      homeposts: state.homeposts,
      ratings: state.ratings,
      promotions: state.promotions,
      favorites: state.favorites,
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUpdateHostPromo: (updatedPromo) => dispatch(fetchUpdateHostPromo(updatedPromo)),
  fetchDeleteHostPromo: (promoId) => dispatch(fetchDeleteHostPromo(promoId)),
  fetchCreateHostPromo: (promo) => dispatch(fetchCreateHostPromo(promo)),
  fetchUpdateSystemPromo: (updatedPromo) => dispatch(fetchUpdateSystemPromo(updatedPromo)),
  fetchDeleteSystemPromo: (promoId) => dispatch(fetchDeleteSystemPromo(promoId)),
  fetchCreateSystemPromo: (promo) => dispatch(fetchCreateSystemPromo(promo)),
  fetchHostPromos: (username) => {dispatch(fetchHostPromos(username))},
  fetchSystemPromos: () => {dispatch(fetchSystemPromos())},
  
  //////////////////////////////////////////////////////////////////////////////////////////////
  postRating: (homepostId, rating, comment) => dispatch(postRating(homepostId, rating, comment)),
  fetchHomeposts: () => {dispatch(fetchHomeposts())},
  fetchRatings: () => {dispatch(fetchRatings())},
  
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (homepostId) => dispatch(postFavorite(homepostId)),
  deleteFavorite: (homepostId) => dispatch(deleteFavorite(homepostId))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchHomeposts();
    this.props.fetchRatings();
    this.props.fetchFavorites();
  }

  render() {
    return (
      <div>
        {/* <Header auth={this.props.auth} 
              loginUser={this.props.loginUser} 
              logoutUser={this.props.logoutUser} 
        /> */}
        <Switch>
          
          <Route path="/host" 
                render={() => <HostManager  auth={this.props.auth} 
                                            promotions={this.props.promotions}
                                            loginUser={this.props.loginUser} 
                                            logoutUser={this.props.logoutUser} 
                                            fetchHostPromos={this.props.fetchHostPromos}
                                            fetchUpdateHostPromo = {this.props.fetchUpdateHostPromo}
                                            fetchDeleteHostPromo = {this.props.fetchDeleteHostPromo}
                                            fetchCreateHostPromo = {this.props.fetchCreateHostPromo}
                              />}/>
          <Route path="/admin" 
                render={() => <AdminManager auth={this.props.auth} 
                                            promotions={this.props.promotions}
                                            loginUser={this.props.loginUser} 
                                            logoutUser={this.props.logoutUser} 
                                            deletePromo={this.props.deletePromo}
                                            homeposts={this.props.homeposts}
                                            fetchSystemPromos={this.props.fetchSystemPromos}
                                            fetchUpdateSystemPromo = {this.props.fetchUpdateSystemPromo}
                                            fetchDeleteSystemPromo = {this.props.fetchDeleteSystemPromo}
                                            fetchCreateSystemPromo = {this.props.fetchCreateSystemPromo}
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
        </Switch>
        <Footer/>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
