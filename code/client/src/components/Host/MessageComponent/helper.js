import { baseUrl } from '../../../shared/baseUrl';
const moment = require('moment');
const axios = require('axios');

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.validateStatus = function (status) { return true; }; // don't care about status codes

export function fetchMessages() {
  return new Promise((resolve, reject) => {
    axios.get('/messages').then(res => {
      const data = res.data;
      if (data.err) return reject(data.err);
      const messages = data.messages.map(m => {
        const s = m.sender;
        const sender = {
            _id: s._id,
            username: s.username,
            firstName: s.firstName,
            lastName: s.lastName,
            email: s.email,
            phone: s.phone,
            fullname: `${s.lastName} ${s.firstName}`
        };
        return {
          _id: m._id,
          sender: sender,
          title: m.title,
          content: m.content,
          timeObj: moment(m.time),
          time: moment(m.time).format('HH:mm ngày D/M'),
          seen: m.seen,
          type: 'Khách vãng lai',
        };
      });
      return resolve(messages);
    }).catch(err => {
      reject(err);
    })
  });
};

export function deleteMessage(messageId) {
  console.log(messageId);
  return new Promise((resolve, reject) => {
    axios.delete(`/messages/${messageId}`, {}).then(response => {
      if (response.data.err) reject(response.data.err);
      else resolve();
    }).catch(err => reject(err));
  });
}

export function sendReplyMessage(message) {
  console.log('new', message);
  return new Promise((resolve, reject) => {
    axios.post('/messages', {
      receiverId: message.receiverId,
      title: message.title,
      content: message.content
    }).then(response => {
      if (response.data.err) reject(response.data.err);
      else resolve();
    }).catch(err => reject(err));
  });
}

export function seenMessage(messageId) {
  return new Promise((resolve, reject) => {
    axios.put(`/messages/${messageId}`, {}).then(res => {
      if (res.data.err) reject(res.data.err);
      else resolve();
    }).catch(err => reject(err));
  });
}