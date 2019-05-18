import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Header from "./components/HeaderComponent";
import Home from "./components/HomeComponent";
import Footer from "./components/FooterComponent";

const store = ConfigureStore();

/*  Main App */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
