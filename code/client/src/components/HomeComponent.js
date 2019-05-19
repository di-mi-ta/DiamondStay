import React, {Component} from 'react';
import MainHeader from './HomePage/MainHeader';
import MainPage from './HomePage/MainPage';
import {Link, Switch, Route} from 'react-router-dom';
import House from './Homestay/House'

class Home extends Component{
    render(){
        return(
          <div>
            <MainHeader/>
            <MainPage/>
          </div> 
        );
    }
}

export default Home;