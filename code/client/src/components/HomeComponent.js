import React, {Component} from 'react';
import MainHeader from './HomePage/MainHeader';
import MainPage from './HomePage/MainPage';

class Home extends Component{
    render(){
        return(
          <div>
            <MainHeader />
            <MainPage />
          </div>
        );
    }
}

export default Home;
