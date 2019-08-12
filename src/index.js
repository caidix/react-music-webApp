import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { LocaleProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/reset.css'

import store from './store'


ReactDOM.render(<Provider store={store}>
    <Router><LocaleProvider locale={zhCN}><App /></LocaleProvider></Router>
</Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
