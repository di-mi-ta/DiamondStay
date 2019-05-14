import React, { Component } from 'react';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {postRating, fetchHomeposts, fetchRatings, 
        fetchHostPromos, loginUser, logoutUser, fetchFavorites, 
        postFavorite, deleteFavorite, deletePromo,
        fetchUpdateHostPromo, fetchDeleteHostPromo,
        fetchCreateHostPromo} from '../redux/ActionCreators';
import AdminManager from '../components/AdminManagerComponent';
import HostManager from '../components/HostManagerComponent';
import { Layout } from 'antd';
import Header from './HeaderComponent';

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
  //////////////////////////////////////////////////////////////////////////////////////////////
  postRating: (homepostId, rating, comment) => dispatch(postRating(homepostId, rating, comment)),
  fetchHomeposts: () => {dispatch(fetchHomeposts())},
  fetchRatings: () => {dispatch(fetchRatings())},
  fetchHostPromos: (username) => {dispatch(fetchHostPromos(username))},
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
        <Header auth={this.props.auth} 
              loginUser={this.props.loginUser} 
              logoutUser={this.props.logoutUser} 
        />
        <Switch>
          <Route path="/host" 
                render={() => <HostManager  auth={this.props.auth} 
                                            promotions={this.props.promotions}
                                            homeposts={this.props.homeposts}
                                            fetchHostPromos={this.props.fetchHostPromos}
                                            fetchUpdateHostPromo = {this.props.fetchUpdateHostPromo}
                                            fetchDeleteHostPromo = {this.props.fetchDeleteHostPromo}
                                            fetchCreateHostPromo = {this.props.fetchCreateHostPromo}
                              />}/>
          <Route path="/admin" 
                render={() => <AdminManager auth={this.props.auth} 
                                            promotions={this.props.promotions}
                                            deletePromo={this.props.deletePromo}
                                            homeposts={this.props.homeposts}
                              />}/>
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
