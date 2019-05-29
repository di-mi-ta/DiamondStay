import initAxios from './initAxios';
const axios = require('axios');

initAxios(axios);

export function search(searchObject) {
    return new Promise(function(resolve, reject) {
        axios.get('/search?'+searchObject).then(results => {
            resolve(results.data);
        }).catch(err => {
            reject(err);
        });
    });
}
