import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import AdminManager from '../components/AdminManager/AdminManagerComponent';
import HostManager from '../components/HostManager/HostManagerComponent';
import House from './Homestay/House';
import Home from "./HomeComponent";
import Footer from "./FooterComponent";
import NewBookingPage from "./single-pages/NewBookingPage";
import UpdatedHomepostManager from './HostManager/HomepostUpdate/UpdatedManager';
import HostHeader from './Header/HostHeader'
import NormalUserMessageInbox from './single-pages/NormalUserMessageInbox';
import SearchResults from './single-pages/SearchResults';
import RenterManager from './RenterManager/RenterManager';
import {connect} from 'react-redux';
import * as actions from '../redux/ActionCreators';
import {Divider} from 'antd';

class Main extends Component {

  componentDidMount(){
    this.props.fetchHomeposts();
    this.props.fetchSystemPromos();
  }

  render() {
    return (
      <div>
        <Switch>
          {/* debug purpose <Route path="/boo" component={Booking}/>*/}
          <Route path="/" exact={true} component={Home} />
          <Route path="/search" component={SearchResults} />
          <Route path="/host" component={HostManager} />
          <Route path="/admin" component={AdminManager} />
          <Route path="/me" component={RenterManager} />
          <Route path="/room/:homepostId" component={House} />
          <Route path="/properties/:homepostId"
            component={({match}) => (
              <div>
                <HostHeader/>
                <Divider style={{
                          boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                          margin: 0
                        }} />
                <UpdatedHomepostManager
                  match={match}
                />
              </div>
            )}
          />
          <Route path="/booking/new" component={NewBookingPage} />
          <Route path="/messages" component={NormalUserMessageInbox}/>
          <Redirect to='/'/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchSystemPromos: () => {dispatch(actions.fetchSystemPromos())},
});

export default withRouter(connect(null, mapDispatchToProps)(Main));
