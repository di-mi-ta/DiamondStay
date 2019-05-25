import React from 'react';
import { Form, Typography, Button, Col, Popconfirm } from 'antd';
const Item = Form.Item;
const { Paragraph } = Typography;


const formItemLayout = {
  labelAlign: 'left',
  labelCol: { span: 3, offset: 2 },
  wrapperCol: { span: 10, offset: 2 },
  style: {
    marginBottom: '0px',
  }
};

class MessageDetail extends React.Component {
  state = {
    openReplyWindow: false,
  }

  render() {
    const { sender, time, title, content, type } = this.props.message;
    return (
      <div>
        <Form>
          <Item {...formItemLayout} label='Người gửi'>
            <Paragraph>
              <span><b>{sender.name}{'   '}</b></span>
              <span>{type}</span>
            </Paragraph>
          </Item>
          <Item {...formItemLayout} label='Thời gian'>
            <Paragraph>{time}</Paragraph>
          </Item>
          <Item {...formItemLayout} label='Tiêu đề'>
            <Paragraph strong={true}>{title}</Paragraph>
          </Item>
          <Item {...formItemLayout} label='Nội dung'>
            <Paragraph>{content}</Paragraph>
          </Item>
        </Form>
        <Col offset={6}>
          <Popconfirm
            title='Bạn chắc chắn muốn xoá tin nhắn này?'
            okText='Xoá'
            cancelText='Huỷ'
            onConfirm={() => this.props.onDeleteMessage()}
          >
            <Button type='danger'>Xoá tin nhắn</Button>
          </Popconfirm>
          <Button
            type='primary'
            onClick={() => this.props.onClickOnRepy()}
          >
            Trả lời
          </Button>
          <Button type='default' onClick={this.props.onReturn}>Trở lại</Button>
        </Col>
      </div>
    );
  }
}

export default MessageDetail;