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

export function changeUserInfo(userId, newInfo, lastAuth) {
  return new Promise(function(resolve, reject) {
    axios.post(`users/changeInfo`, newInfo).then(res => {
      const data = res.data;
      if (data.err || data.error)
        reject(data.err || data.error);
      else {
        // clear current creds
        localStorage.removeItem('creds');
        // set new creds in local at client to update info
        localStorage.setItem('creds', JSON.stringify({
          username: lastAuth.user.username,
          password: lastAuth.user.password,
          info:{
            _id: data.user._id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.phone,
            typeUser: data.user.typeUser,
            coin: data.user.coin,
          }
        }));
        resolve(data.user);
      }
    }).catch(err => reject({
      err: {
        type: 'NetworkError',
        message: 'Lỗi mạng khi thực hiện truy vấn',
        detail: err
      }
    }));
  });
}
