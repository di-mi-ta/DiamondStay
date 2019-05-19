import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {postRating, fetchHomeposts, fetchRatings, 
        fetchHostPromos, loginUser, logoutUser, fetchFavorites, 
        postFavorite, deleteFavorite, deletePromo,
        fetchUpdateHostPromo, fetchDeleteHostPromo,
        fetchCreateHostPromo, fetchCreateSystemPromo, 
        fetchDeleteSystemPromo, fetchUpdateSystemPromo, 
        fetchSystemPromos, fetchUpdateHomepost, fetchCreateHomepost} from '../redux/ActionCreators';
import AdminManager from '../components/AdminManager/AdminManagerComponent';
import HostManager from '../components/HostManager/HostManagerComponent';
import House from './Homestay/House';
import Home from "./HomeComponent";
import "../css/main_styles.css";
import "../css/about.css";
import "../css/about_responsive.css";
import "../css/blog.css";
import "../css/blog_responsive.css";
import "../css/elements.css";
import "../css/elements_responsive.css";

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
  fetchHomeposts: (query='') => {dispatch(fetchHomeposts(query))},
  fetchUpdateHomepost: (homepost) => {dispatch(fetchUpdateHomepost(homepost))},
  fetchCreateHomepost: (homepost) => {dispatch(fetchCreateHomepost(homepost))},
  //////////////////////////////////////////////////////////////////////////////////////////////
  postRating: (homepostId, rating, comment) => dispatch(postRating(homepostId, rating, comment)),
  
  fetchRatings: () => {dispatch(fetchRatings())},
  
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (homepostId) => dispatch(postFavorite(homepostId)),
  deleteFavorite: (homepostId) => dispatch(deleteFavorite(homepostId))
});

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/host" 
                render={() => <HostManager  auth={this.props.auth} 
                                            promotions={this.props.promotions}
                                            loginUser={this.props.loginUser} 
                                            logoutUser={this.props.logoutUser} 
                                            fetchHomeposts={this.props.fetchHomeposts}
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
                                            fetchHomeposts={this.props.fetchHomeposts}
                                            fetchCreateHomepost={this.props.fetchCreateHomepost}
                                            fetchUpdateHomepost={this.props.fetchUpdateHomepost}
                                            fetchSystemPromos={this.props.fetchSystemPromos}
                                            fetchUpdateSystemPromo = {this.props.fetchUpdateSystemPromo}
                                            fetchDeleteSystemPromo = {this.props.fetchDeleteSystemPromo}
                                            fetchCreateSystemPromo = {this.props.fetchCreateSystemPromo}
                              />}/>
          <Route path="/home" 
                render={() => <Home/>}
          />
          <Route path="/room/:homepostId" 
                render={() => <House/>}
          />
          <Redirect to='/home'/>
        </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
