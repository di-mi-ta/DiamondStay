import React, { Component } from 'react';
import { Table } from 'reactstrap';
import RoomStatusItem from "./RoomStatusItem";

const roomStatusMap = {
  STAYING: { text: 'Đang ở', color: 'success' },
  AVAILABLE: { text: 'Trống', color: 'warning' },
};

class RoomList extends Component {
  state = {
    rooms: [
      {
        room: 'Phòng đơn 1 tầng 1',
        custName: 'Cường',
        status: 'STAYING',
        dateIn: '20-11-2019',
        dateOut: '22-11-2019'
      },
      {
        room: 'Phòng đơn 2 tầng 1',
        status: 'AVAILABLE',
      }
    ]
  };
  
  render() {
    return (
      <Table hover size='sm' responsive>
        <thead>
          <tr>
            <th>Phòng</th>
            <th>Tên khách hàng</th>
            <th>Tình trạng</th>
            <th>Ngày đến</th>
            <th>Ngày đi</th>
          </tr>
        </thead>
        <tbody>
          {this.state.rooms.map(roomInfo => {
            const map = roomStatusMap[roomInfo.status];
            const props = {
              ...roomInfo,
              status: map.text,
              color: map.color
            };
            
            return <RoomStatusItem {...props}/>
          })}
        </tbody>
      </Table>
    );
  }
}

export default RoomList;