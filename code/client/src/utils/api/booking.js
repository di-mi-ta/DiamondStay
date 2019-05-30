import initAxios from './initAxios';
const moment = require('moment');
const axios = require('axios');

initAxios(axios);

export function sendNewBooking(booking) {
    return new Promise(function(resolve, reject) {
        axios.post('/booking', booking).then(res => {
            const data = res.data;
            if (data.err) reject(data.err);
            else resolve();
        }).catch(err => {
            reject(err);
        });
 });
}
