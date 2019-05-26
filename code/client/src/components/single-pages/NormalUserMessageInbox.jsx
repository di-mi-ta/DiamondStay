import React, { Component } from 'react';
import { Col, Row, Typography } from 'antd';
import MessageInbox from '../MessageInbox';
import MainHeader from '../HomePage/MainHeader';

const { Title } = Typography;

export default () => (
  <div>
    <MainHeader />
    <Row>
      <Col offset={2}>
        <Title level={2}>
          Tin nhắn
        </Title>
      </Col>
    </Row>
    <MessageInbox />
  </div>
);
