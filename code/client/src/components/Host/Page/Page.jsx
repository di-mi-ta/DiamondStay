import React from 'react';
import PageContent from '../Content';
import { Layout, Col } from 'antd';
import Header from '../Header';
import 'antd/dist/antd.css';
import './Page.css';
const { Content, Footer } = Layout;

export default class MainPage extends React.Component {
  render() {
    return (
      <Layout className='layout'>
        <Header />
        <Content className='content'>
          <Col span={18} offset={4}>
            <PageContent />
          </Col>
        </Content>
        <Footer className='footer'>
          Add some infomation for the footer
        </Footer>
      </Layout>
    );
  }
}