let messages = [
  {
    messageId: '111',
    senderId: '5555555',
    sender: 'Văn Tiến Cường',
    time: '20-11-2018',
    title: 'Hỏi về chỗ giữ xe',
    content: 'Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn.',
    type: 'Khách vãng lai',
    seen: true
  },
  {
    messageId: '222',
    senderId: '999999999',
    sender: 'Ghost',
    time: '20-11-2019',
    title: 'Re: Chào hỏi',
    content: 'Đây là nội dung tin nhắn',
    type: 'Khách thuê',
    seen: false
  },
];

export function fetchMessages(userId) {
  return new Promise((resolve, reject) => {
    // simulate network delay
    setTimeout(() => {
      resolve(messages)
    }, 1000);
  });
};

export function deleteMessage(messageId) {
  return new Promise((resolve, reject) => {
    messages = messages.filter(m => m.messageId != messageId);
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export function sendReplyMessage(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}