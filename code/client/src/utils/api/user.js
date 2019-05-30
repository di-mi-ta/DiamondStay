import initAxios from './initAxios';
const moment = require('moment');
const axios = require('axios');

initAxios(axios);

export function registerUser(userInfo) {
    return new Promise(function(resolve, reject) {
        if (!userInfo.email)
            delete userInfo.email;
        if (!userInfo.phone)
            delete userInfo.phone;
        axios.post('/users/signup', userInfo).then(res => {
            const data = res.data;
            if (data.err) reject(data.err);
            else resolve(data.user);
        }).catch(err => {
            reject(err);
        });
 });
}

export function changeUserInfo(userId, newInfo) {
  return new Promise(function(resolve, reject) {
    axios.post(`users/changeInfo`, newInfo).then(res => {
      const data = res.data;
      if (data.err || data.error)
        reject(data.err || data.error);
      else
        resolve();
    }).catch(err => reject({
      err: {
        type: 'NetworkError',
        message: 'Lỗi mạng khi thực hiện truy vấn',
        detail: err
      }
    }));
  });
}
