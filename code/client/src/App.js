import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Header from "./components/HeaderComponent";
import Home from "./components/HomeComponent"; //Khoa
import Main from "./components/MainComponent";
import Footer from "./components/FooterComponent";
import "./css/main_styles.css";
import House from "./components/House";

const store = ConfigureStore();

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
          <div>
            <House/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
