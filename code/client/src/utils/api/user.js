import { baseUrl } from '../../shared/baseUrl';
const moment = require('moment');
const axios = require('axios');

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.validateStatus = function (status) { return true; }; // don't care about status codes

export function registerUser(userInfo) {
    return new Promise(function(resolve, reject) {
        if (!userInfo.email)
            delete userInfo.email;
        if (!userInfo.phone)
            delete userInfo.phone;
        axios.post('/users/signup', userInfo).then(res => {
            const data = res.data;
            if (data.err) reject(data.err);
            else resolve();
        }).catch(err => {
            reject(err);
        });
 });
}
