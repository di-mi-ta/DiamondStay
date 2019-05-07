import React, { Component } from 'react';
import Home from './HomeComponent';
import HomePostDetailed from './HomepostDetailedComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postRating, fetchHomeposts, fetchRatings, fetchPromos, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite} from '../redux/ActionCreators';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import "../css/main_styles.css";

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

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );

    return (
      <div class="main">
        <div class="features">
        <div class="container">
            <div class="row">
                {/*Icon box*/}
                <div class="col-lg-4 icon_box_col">
                    <div class="icon_box d-flex flex-column align-items-center justify-content-start text-center">
                        <div class="icon_box_icon"><img src="images/icon_1.svg" class="svg" alt="https://www.flaticon.com/authors/monkik"/></div>
                        <div class="icon_box_title"><h2>Fabulous Resort</h2></div>
                        <div class="icon_box_text">
                            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse nec faucibus velit. Quisque eleifend orci ipsum, a bibendum.</p>
                        </div>
                    </div>
                </div>

                {/*Icon Box*/}
                <div class="col-lg-4 icon_box_col">
                    <div class="icon_box d-flex flex-column align-items-center justify-content-start text-center">
                        <div class="icon_box_icon"><img src="images/icon_2.svg" class="svg" alt="https://www.flaticon.com/authors/monkik"/></div>
                        <div class="icon_box_title"><h2>Infinity Pool</h2></div>
                        <div class="icon_box_text">
                            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse nec faucibus velit. Quisque eleifend orci ipsum, a bibendum.</p>
                        </div>
                    </div>
                </div>

                {/*Icon box*/}
                <div class="col-lg-4 icon_box_col">
                    <div class="icon_box d-flex flex-column align-items-center justify-content-start text-center">
                        <div class="icon_box_icon"><img src="images/icon_3.svg" class="svg" alt="https://www.flaticon.com/authors/monkik"/></div>
                        <div class="icon_box_title"><h2>Luxury Rooms</h2></div>
                        <div class="icon_box_text">
                            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse nec faucibus velit. Quisque eleifend orci ipsum, a bibendum.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div class="gallery">
          <div class="gallery_slider_container">
              <div class="owl-carousel owl-theme gallery_slider">
                  {/*Slide*/}
                  <div class="gallery_item">
                      <div class="background_image"><img src="../images/gallery_1.jpg"/></div>
                      <a class="colorbox" href="images/gallery_1.jpg"></a>
                  </div>
                  {/*Slide*/}
                  <div class="gallery_item">
                      <div class="background_image"><img src="../images/gallery_2.jpg"/></div>
                      <a class="colorbox" href="images/gallery_2.jpg"></a>
                  </div>
                  {/*Slide*/}
                  <div class="gallery_item">
                      <div class="background_image"><img src="../images/gallery_3.jpg"/></div>
                      <a class="colorbox" href="images/gallery_3.jpg"></a>
                  </div>
                  {/*Slide*/}
                  <div class="gallery_item">
                      <div class="background_image"><img src="../images/gallery_4.jpg"/></div>
                      <a class="colorbox" href="images/gallery_4.jpg"></a>
                  </div>
              </div>
          </div>
        </div>
        <div class="about">
          <div class="container">
            <div class="row">
              {/*About Content*/}
              <div class="col-lg-6">
                <div class="about_content">
                  <div class="about_title"><h2>The River / 10 years of excellence</h2></div>
                  <div class="about_text">
                      <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse nec faucibus velit. Quisque eleifend orci ipsum, a bibendum lacus suscipit sit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse nec faucibus velit. Quisque eleifend orci ipsum, a bibendum lacus suscipit sit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse nec faucibus velit.</p>
                  </div>
                </div>
              </div>

              {/*About Images*/}
              <div class="col-lg-6">
                  <div class="about_images d-flex flex-row align-items-center justify-content-between flex-wrap">
                      <img src="images/about_1.png" alt=""/>
                      <img src="images/about_2.png" alt=""/>
                      <img src="images/about_3.png" alt=""/>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonials">
          <div class="parallax_background parallax-window" data-parallax="scroll" data-image-src="images/testimonials.jpg" data-speed="0.8"></div>
          <div class="testimonials_overlay"></div>
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="testimonials_slider_container">
                  {/*Testinomials slide*/}
                  <div class="owl-carousel owl-theme test_slider">
                    {/*Slide*/}
                    <div  class="test_slider_item text-center">
                        <div class="rating rating_5 d-flex flex-row align-items-start justify-content-center"><i></i><i></i><i></i><i></i><i></i></div>
                        <div class="testimonial_title"><a href="#">Perfect Stay</a></div>
                        <div class="testimonial_text">
                            <p>Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit amet tellus blandit. Etiam nec odio vestibulum est mattis effic.</p>
                        </div>
                        <div class="testimonial_image"><img src="images/user_1.jpg" alt=""/></div>
                        <div class="testimonial_author"><a href="#">Samantha Smith</a>, Greece</div>
                    </div>

                    {/*Slide*/}
                    <div  class="test_slider_item text-center">
                        <div class="rating rating_5 d-flex flex-row align-items-start justify-content-center"><i></i><i></i><i></i><i></i><i></i></div>
                        <div class="testimonial_title"><a href="#">Nice place</a></div>
                        <div class="testimonial_text">
                            <p>Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit amet tellus blandit. Etiam nec odio vestibulum est mattis effic.</p>
                        </div>
                        <div class="testimonial_image"><img src="images/user_2.jpg" alt=""/></div>
                        <div class="testimonial_author"><a href="#">Michael Doe</a>, Italy</div>
                    </div>

                    {/*Slide*/}
                    <div  class="test_slider_item text-center">
                        <div class="rating rating_5 d-flex flex-row align-items-start justify-content-center"><i></i><i></i><i></i><i></i><i></i></div>
                        <div class="testimonial_title"><a href="#">We loved it</a></div>
                        <div class="testimonial_text">
                            <p>Etiam nec odio vestibulum est mattis effic iturut magna. Pellentesque sit amet tellus blandit. Etiam nec odio vestibulum est mattis effic.</p>
                        </div>
                        <div class="testimonial_image"><img src="images/user_3.jpg" alt=""/></div>
                        <div class="testimonial_author"><a href="#">Luis Garcia</a>, Spain</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="booking">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="booking_title text-center"><h2>Book a room</h2></div>
                <div class="booking_text text-center">
                    <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse nec faucibus velit. Quisque eleifend orci ipsum, a bibendum lacus suscipit sit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse nec faucibus velit. Quisque eleifend orci ipsum, a bibendum lacus suscipit sit.</p>
                </div>
                {/*Booking Slider*/}
                <div class="booking_slider_container">
                    <div class="owl-carousel owl-theme booking_slider">
                        
                        {/*Slide*/}
                        <div class="booking_item">
                            <div class="background_image"><img src="../images/booking_1.jpg"/></div>
                            <div class="booking_overlay trans_200"></div>
                            <div class="booking_price">$120/Night</div>
                            <div class="booking_link"><a href="booking.html">Family Room</a></div>
                        </div>

                        {/*Slide*/}
                        <div class="booking_item">
                            <div class="background_image"><img src="../images/booking_2.jpg"/></div>
                            <div class="booking_overlay trans_200"></div>
                            <div class="booking_price">$120/Night</div>
                            <div class="booking_link"><a href="booking.html">Deluxe Room</a></div>
                        </div>

                        {/*Slide*/}
                        <div class="booking_item">
                            <div class="background_image"><img src="../images/booking_3.jpg"/></div>
                            <div class="booking_overlay trans_200"></div>
                            <div class="booking_price">$120/Night</div>
                            <div class="booking_link"><a href="booking.html">Single Room</a></div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="blog">
          {/*Blog slider*/}
          <div class="blog_slider_container">
            <div class="owl-carousel owl-theme blog_slider">  
              {/*Slide*/}
              <div class="blog_slide">
                  <div class="background_image"><img src="../images/index_blog_1.jpg"/></div>
                  <div class="blog_content">
                      <div class="blog_date"><a href="#">Oct 20, 2018</a></div>
                      <div class="blog_title"><a href="#">How to book your stay</a></div>
                  </div>
              </div>

              {/*Slide*/}
              <div class="blog_slide">
                  <div class="background_image"><img src="../images/index_blog_2.jpg"/></div>
                  <div class="blog_content">
                      <div class="blog_date"><a href="#">Oct 20, 2018</a></div>
                      <div class="blog_title"><a href="#">10 restaurants in town</a></div>
                  </div>
              </div>

              {/*Slide*/}
              <div class="blog_slide">
                  <div class="background_image"><img src="../images/index_blog_3.jpg"/></div>
                  <div class="blog_content">
                      <div class="blog_date"><a href="#">Oct 20, 2018</a></div>
                      <div class="blog_title"><a href="#">A perfect wedding</a></div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
