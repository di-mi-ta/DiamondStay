import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import HostPage from './components/host/Page'
import "antd/dist/antd.css";

var Test = HostPage;

ReactDOM.render(<Test />, document.getElementById('root'));
registerServiceWorker();
