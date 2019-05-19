import React from 'react';
import { Table, Tag } from "antd";

const roomStatusMap = {
  STAYING: { text: 'Đang ở', color: 'green' },
  AVAILABLE: { text: 'Trống', color: 'red' },
  BOOKED: { text: 'Đã đặt', color: 'blue' },
};

const columns = [{
  title: 'Phòng',
  dataIndex: 'roomName',
}, {
  title: 'Trạng thái',
  dataIndex: 'status',
  render: (statusList) => (
    <React.Fragment>
      {statusList.map(status => {
        const map = roomStatusMap[status];
        const newText = map.text;
        const color = map.color;
        return <span><Tag color={color}>{newText}</Tag></span>
      })}
    </React.Fragment>
  ),
}, {
  title: 'Tên khách hàng',
  dataIndex: 'custName',
  render: (text) => <a href='#'>{text}</a>,
}, {
  title: 'Ngày đến',
  dataIndex: 'dateIn',
}, {
  title: 'Ngày đi',
  dataIndex: 'dateOut',
}];

const data = [
  {
    roomName: 'Phòng đơn 1 tầng 1',
    custName: 'Văn Tiến Cường',
    status: ['STAYING', 'BOOKED'],
    dateIn: '20-11-2019',
    dateOut: '22-11-2019',
  },
  {
    roomName: 'Phòng đơn 2 tầng 1',
    custName: '',
    status: ['AVAILABLE'],
    dateIn: '',
    dateOut: '',
  }
];

export default class RoomStatusList extends React.Component {
  render() {
    return (
      <Table columns={columns} dataSource={data} />
    );
  }
};