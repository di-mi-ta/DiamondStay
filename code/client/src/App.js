import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Header from "./components/HeaderComponent";
import Home from "./components/HomeComponent";
import Footer from "./components/FooterComponent";
import House from "./components/DetailedHomepost/House";
import MainHeader from './components/MainHeader';
import MainPage from './components/MainPage';

const store = ConfigureStore();

/*  Main App */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {/* <div>
            <div class="super_container">
              <Header/>
              <Home/>
              <Main/>
              <Footer/>
            </div>
          </div> */}
          
          {/* <div>
            <Main/>
          </div> */}
          <div>
            <MainHeader/>
            <MainPage/>
            <House/>
            <Footer/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
