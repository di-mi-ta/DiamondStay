import React, {Component} from 'react';
<<<<<<< HEAD
import MainHeader from './HomePage/MainHeader';
import MainPage from './HomePage/MainPage';

class Home extends Component{
    render(){
        return(
          <div>
            <MainHeader 
                auth={this.props.auth} 
                loginUser={this.props.loginUser} 
                logoutUser={this.props.logoutUser}
                promotions={this.props.promotions}
                homeposts={this.props.homeposts}
                fetchSystemPromos={this.props.fetchSystemPromos}
                fetchHomeposts = {this.props.fetchHomeposts}
            />
            <MainPage
                promotions={this.props.promotions}
                homeposts={this.props.homeposts}
                fetchSystemPromos={this.props.fetchSystemPromos}
                fetchHomeposts = {this.props.fetchHomeposts}/>
          </div> 
=======

class Home extends Component {
    render(){
        return(
            <div className="container">
                <p>Home</p>
            </div>
>>>>>>> tan-branch
        );
    }
}

export default Home;