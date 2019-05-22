import React, {Component} from 'react';
import MainHeader from './HomePage/MainHeader';
import MainPage from './HomePage/MainPage';

class Home extends Component{
    render(){
        return(
          <div>
            <MainHeader auth={this.props.auth} 
                        loginUser={this.props.loginUser} 
                        logoutUser={this.props.logoutUser}
            />
            <MainPage/>
          </div> 
        );
    }
}

export default Home;