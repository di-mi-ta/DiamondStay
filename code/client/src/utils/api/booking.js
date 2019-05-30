import initAxios from './initAxios';
const moment = require('moment');
const axios = require('axios');

initAxios(axios);

export function sendNewBooking(userInfo) {
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
