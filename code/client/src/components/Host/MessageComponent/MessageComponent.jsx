import React from 'react';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';
import MessageReply from './MessageReply';

import { Empty, message as antdMessage } from 'antd';

let messages = [
  {
    senderId: '5555555',
    sender: 'Văn Tiến Cường',
    time: '20-11-2018',
    title: 'Hỏi về chỗ giữ xe',
    content: 'Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn. Đây là nội dung tin nhắn.',
    type: 'Khách vãng lai',
    seen: true
  },
  {
    senderId: '999999999',
    sender: 'Ghost',
    time: '20-11-2019',
    title: 'Re: Chào hỏi',
    content: 'Đây là nội dung tin nhắn',
    type: 'Khách thuê',
    seen: false
  },
];

const MESSAGE_LIST = 1;
const MESSAGE_DETAIL = 2;
const MESSAGE_REPLY = 3;

class MessageComponent extends React.Component {
  state = {
    messages: messages,             // messages receive from above
    openingComponent: MESSAGE_LIST, // the component rendered by this class
    openingMessage: null,           // the message user working with
  };

  componentDidMount() {
    let messages = [...this.state.messages];
    messages.sort((a, b) => {
      if (a.seen !== b.seen)
        return b.seen - a.seen; // unseen messages has higher score
      // return moment(a.time, 'DD-MM-YYYY').
      return 0;
    });
    this.setState({ messages });
  }

  onOpenMessageList = () => {
    this.setState({
      openingComponent: MESSAGE_LIST,
      openingMessage: null, // reset opening message
    });
  };

  onOpenMessageDetail = (message) => {
    // update seen status
    // to network request

    let messages

    this.setState({
      openingComponent: MESSAGE_DETAIL,
      openingMessage: message,
    });
  };

  onOpenMessageReply = () => {
    this.setState({
      openingComponent: MESSAGE_REPLY,
      // the opening message is unchanged
    });
  }

  onDeleteCurrentMessage = () => {
    // TODO move to redux
    // post request
    antdMessage.success('Đã xoá tin nhắn');
    const toDeleteId = this.state.openingMessage.senderId;
    const newMessages = this.state.messages.filter(m => m.senderId !== toDeleteId);
    this.setState({
      messages: newMessages,
      openingComponent: MESSAGE_LIST,
      openingMessage: null
    });
  };

  onSendReplyMessage = (replyMessage) => {
    // do st with network

    antdMessage.success('Tin nhắn đã được gửi');
    this.setState({
      openingComponent: MESSAGE_LIST,
      openingMessage: null,
    });
  };

  render() {
    // No messages
    if (this.state.messages.length === 0) {
      return (
        <Empty
          description={<span>Bạn không có tin nhắn</span>}
        />
      );
    }

    if (this.state.openingComponent === MESSAGE_LIST) {
      return (
        <MessageList
          messages={this.state.messages}
          onClickOnMessage={this.onOpenMessageDetail}
        />
      );
    } else if (this.state.openingComponent === MESSAGE_DETAIL) {
      return (
        <MessageDetail
          message={this.state.openingMessage}
          onDeleteMessage={() => this.onDeleteCurrentMessage()}
          onClickOnRepy={() => this.onOpenMessageReply()}
          onReturn={() => this.onOpenMessageList()}
        />
      );
    }
    else {
      return (
        <MessageReply
          message={this.state.openingMessage}
          onSendReplyMessage={this.onSendReplyMessage}
          onReturn={() => this.onOpenMessageDetail(this.state.openingMessage) /* return to message detail window */}
        />
      )
    }
  }
}

export default MessageComponent;