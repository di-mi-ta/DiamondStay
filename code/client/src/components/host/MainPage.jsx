import React from 'react';
import { Container } from 'reactstrap';
import NavigationBar from './NavigationBar';
import PageBody from './PageBody';

class MainPage extends React.Component {
  render() {
    return (
      <Container fluid='true'>
        <NavigationBar />
        <PageBody />
      </Container>
    );
  }
}

export default MainPage;