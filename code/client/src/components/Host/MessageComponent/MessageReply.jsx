import React from 'react';
import { Button, Popconfirm, message as messageInfo, Form, Typography, Input } from 'antd';
import './styles.css';
import TextArea from 'antd/lib/input/TextArea';

const Item = Form.Item;
const Paragraph = Typography.Paragraph;

const formItemLayout = {
  labelAlign: 'left',
  labelCol: { span: 3, offset: 2 },
  wrapperCol: { span: 10, offset: 2 },
};


const getDefaultTitle = (oldTitle) => 'Re: ' + oldTitle.replace(/(Re: )+/, '');
function getDefaultConent(oldContent) {
  return '\n\n\n\n\n  ------------------------------------\n' + oldContent;
}

export default class MessageReply extends React.Component {
  state = {
    title: getDefaultTitle(this.props.message.title),
    content: getDefaultConent(this.props.message.content),
  };

  onConfirmReturn = () => {
    // messageInfo.info('Đã huỷ thư đang soạn');
    this.props.onReturn();
  };

  onTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  makeReplyMessage = () => {
    return {
      receiverId: this.props.message.sender._id,
      title: this.state.title,
      content: this.state.content
    };
  };

  render() {
    return (
      <div>
        <Form {...formItemLayout}>
          <Item label='Người nhận'>
            <Paragraph>{this.props.message.sender.fullname}</Paragraph>
          </Item>
          <Item label='Chủ đề'>
            <Input name='title' value={this.state.title} onChange={this.onTextChange} />
          </Item>
          <Item label='Nội dung'>
            <TextArea
              name='content'
              autosize={{ minRows: 10, maxRows: 20 }}
              value={this.state.content}
              onChange={this.onTextChange}
            />
          </Item>
          <Item wrapperCol={{ offset: 14 }}>
            <Button type='primary' onClick={() => this.props.onSendReplyMessage(this.makeReplyMessage())}>Gửi</Button>
            <Popconfirm
              title='Huỷ thư đang soạn?'
              okText='Huỷ thư'
              cancelText='Tiếp tục soạn thư'
              onConfirm={() => this.onConfirmReturn()}
            >
              <Button type='danger'>Huỷ</Button>
            </Popconfirm>
          </Item>
        </Form>
      </div>
    );
  }
}