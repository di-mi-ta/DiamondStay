import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import './index.css';   // this is global css file, do not remove
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Testy from './components/Host/Page';

ReactDOM.render(<Testy />, document.getElementById('root'));
registerServiceWorker();
