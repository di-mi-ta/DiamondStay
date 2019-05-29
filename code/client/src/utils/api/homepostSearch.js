import initAxios from './initAxios';
const axios = require('axios');

initAxios(axios);

export function search(searchObject) {
    return new Promise(function(resolve, reject) {
        console.log('AXIOS', searchObject)
        axios.get('/search', {
          params: searchObject
        }).then(results => {
            const data = results.data;
            if (data.err) {
              reject(data.err);
            }
            resolve(results.data.homes);
        }).catch(err => {
            reject({
              err: {
                type: 'NetworkError',
                message: 'Lỗi mạng khi thực hiện truy vấn',
                detail: err
              }
            });
        });
    });
}
