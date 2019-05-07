import React, { Component } from 'react';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {postRating, fetchHomeposts, fetchRatings, 
        fetchPromos, loginUser, logoutUser, fetchFavorites, 
        postFavorite, deleteFavorite, addPromo, deletePromo} from '../redux/ActionCreators';
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
  addPromo: (namePromo, value, dateStart, dateEnd, lstHome) => dispatch(addPromo(namePromo, value, dateStart, dateEnd, lstHome)),
  deletePromo: (promoId) => dispatch(deletePromo(promoId)),
  
  //////////////////////////////////////////////////////////////////////////////////////////////
  postRating: (homepostId, rating, comment) => dispatch(postRating(homepostId, rating, comment)),
  fetchHomeposts: () => {dispatch(fetchHomeposts())},
  fetchRatings: () => {dispatch(fetchRatings())},
  fetchPromos: () => {dispatch(fetchPromos())},
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
    this.props.fetchPromos();
    this.props.fetchFavorites();
  }

  render() {
    const HomePage = () => {
      return(
        <Home homepost={this.props.homeposts.homeposts.filter((homepost) => homepost.featured)[0]}
          homepostsLoading={this.props.homeposts.isLoading}
          homepostsErrMess={this.props.homeposts.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
        />
      );
    }

    return (
      <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
        />
        <Switch>
          <Route path="/host" 
                render={() => <HostManager promotions={this.props.promotions}
                                            homeposts={this.props.homeposts}
                              />}/>
          <Route path="/admin" 
                render={() => <AdminManager promotions={this.props.promotions}
                                            deletePromo={this.props.deletePromo}
                                            homeposts={this.props.homeposts}
                              />}/>
          <Redirect to="/host" />
        </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
