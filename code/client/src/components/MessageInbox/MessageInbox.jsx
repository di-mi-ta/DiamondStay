import React from 'react';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';
import MessageEdit from './MessageEdit';

import { Empty, Col, Row, message as antdMessage } from 'antd';
import * as helper from '../../utils/api/message';

const MESSAGE_LIST = 1;
const MESSAGE_DETAIL = 2;
const MESSAGE_REPLY = 3;

class MessageInbox extends React.Component {
  state = {
    messages: [],             // messages receive from above
    openingComponent: MESSAGE_LIST, // the component rendered by this class
    openingMessage: null,           // the message user working with
  };

  componentDidMount() {
    helper.fetchMessages()
      .then(messages => {
        this.setState({ messages });
      })
      .catch(err => {
        antdMessage.error('Xảy ra lỗi, không thế  tải tin nhắn');
      });
  }

  onOpenMessageList = () => {
    this.setState({
      openingComponent: MESSAGE_LIST,
      openingMessage: null, // reset opening message
    });
  };

  onOpenMessageDetail = (message) => {
    // already seen, don't do network request
    if (message.seen === true) {
      return this.setState({
        openingComponent: MESSAGE_DETAIL,
        openingMessage: message,
      });
    }

    // message not seen yet -> do network request
    const openingId = message._id;
    helper.seenMessage(openingId).then(() => {

      // successful, change value locally, no need to fetch messages again
      const messages = this.state.messages.map(m => {
        if (m._id === openingId)
          return { ...m, seen: true };
        else return m;
      });
      this.setState({
        messages: messages,
        openingComponent: MESSAGE_DETAIL,
        openingMessage: message,
      });
    }).catch(err => {
      // antdMessage.error('Lỗi khi seen message'); // PRODUCTION
      this.setState({
        openingComponent: MESSAGE_DETAIL,
        openingMessage: message,
      });
    });
  };

  onOpenMessageReply = () => {
    this.setState({
      openingComponent: MESSAGE_REPLY,
      // the opening message is unchanged
    });
  }

  onDeleteCurrentMessage = () => {
    const deleteId = this.state.openingMessage._id;
    helper.deleteMessage(deleteId)
      .then(() => {
        antdMessage.success('Đã xoá tin nhắn');
        const newMessages = this.state.messages.filter(m => m._id !== deleteId);
        this.setState({
          messages: newMessages,
          openingComponent: MESSAGE_LIST,
          openingMessage: null
        });
      }).catch(err => {
        antdMessage.warn('Có lỗi xảy ra, xoá không thành công!');
        this.setState({
          openingComponent: MESSAGE_LIST,
          openingMessage: null
        });
      });

  };

  onSendReplyMessage = (replyMessage) => {
    console.log(replyMessage);
    helper.sendReplyMessage(replyMessage).then(() => {
      antdMessage.success('Tin nhắn đã được gửi');
    }).catch(err => {
      antdMessage.error('Có lỗi xảy ra. Tin nhắn chưa được gửi.');
    });
    this.setState({
      openingComponent: MESSAGE_LIST,
      openingMessage: null,
    });
  };

  render() {
    let component;
    if (this.state.messages.length === 0) {
      component = (
        <Empty
          description={<span>Bạn không có tin nhắn</span>}
        />
      );
    }

    if (this.state.openingComponent === MESSAGE_LIST) {
      component = (
        <MessageList
          messages={this.state.messages}
          onClickOnMessage={this.onOpenMessageDetail}
        />
      );
    } else if (this.state.openingComponent === MESSAGE_DETAIL) {
      component = (
        <MessageDetail
          message={this.state.openingMessage}
          onDeleteMessage={() => this.onDeleteCurrentMessage()}
          onClickOnRepy={() => this.onOpenMessageReply()}
          onReturn={() => this.onOpenMessageList()}
        />
      );
    }
    else {
      component = (
        <MessageEdit
          receiverName={this.state.openingMessage.sender.fullname}
          receiverId={this.state.openingMessage.sender._id}
          defaultTitle={helper.makeDefaultTitle(this.state.openingMessage.title)}
          defaultContent={helper.makeDefaultContent(this.state.openingMessage.content)}
          onSendMessage={this.onSendReplyMessage}
          onReturn={null}
        />
      )
    }

    return (
      <Row>
        <Col span={20} offset={2}>
          {component}
        </Col>
      </Row>
    );
  }
}

export default MessageInbox;
