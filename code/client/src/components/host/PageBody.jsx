import React, { Component } from 'react';
import { Col, Card, CardTitle } from 'reactstrap';
import HostMessageList from './RoomStatusList';

class PageBody extends Component {
  render() {
    return (
      <Col lg="10">
        <Card body>
          <CardTitle>Danh sách phòng</CardTitle>
          <HostMessageList />
        </Card>
      </Col>
    );
  }
}

export default PageBody;