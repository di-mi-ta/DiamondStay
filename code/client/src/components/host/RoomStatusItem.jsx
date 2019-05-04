import React, { Component } from 'react';

const RoomStatusItem = ({ room, custName, status, dateIn, dateOut, color }) => {
  
  return (
    <tr className={'active'}>
      <td>{room}</td>
      <td>{custName}</td>
      <td>{status}</td>
      <td>{dateIn}</td>
      <td>{dateOut}</td>
    </tr>
  );
}

export default RoomStatusItem;