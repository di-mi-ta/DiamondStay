import React from 'react';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Người gửi',
    dataIndex: 'sender',
  }, {
    title: 'Thời gian',
    dataIndex: 'time',
  }, {
    title: 'Chủ đề',
    dataIndex: 'title',
  }, {
    title: 'Chú thích',
    dataIndex: 'type',
  }, {
    title: 'Trạng thái',
    dataIndex: 'seen',
    render: (seen) => {
      if (seen)
        return <Tag color='green'>Đã xem</Tag>
      else
        return <Tag color='blue'>Mới</Tag>
    }
  }
];

class MessageList extends React.Component {
  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.props.messages}
        onRow={(message, rowIndex) => {
          // Row index is 0, 1, ..., NOT row's key
          return {
            onClick: () => {
              this.props.onClickOnMessage(message);
            }
          } 
        }}
      />
    );
  }
}

export default MessageList;