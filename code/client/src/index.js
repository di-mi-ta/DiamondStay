import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import HostPage from './components/host/Page'
import "antd/dist/antd.css";

var Test = HostPage;

ReactDOM.render(<Test />, document.getElementById('root'));
registerServiceWorker();
