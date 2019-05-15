import BrowserRouter from 'react-router-dom/BrowserRouter';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Header from "./components/HeaderComponent";
import Home from "./components/HomeComponent"; //Khoa
import Result from "./components/ResultComponent";
import "./css/main_styles.css";
class ResultPage extends Component{
    render(){
        return(
            <Provider>
                <BrowserRouter>
                    <div>
                        <div class="super_container">
                            <Header/>
                            <Home/>
                            <Result/>
                            <Footer/>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default ResultPage;