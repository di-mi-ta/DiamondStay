import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

/*  Main App */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* Main page
            <div class="super_container">
              <Header/>
              <Home/>
              <Main/>
              <Footer/>
            </div>
            */}
            <Header/>
            <Booking/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
