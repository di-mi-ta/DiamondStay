import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AdminManager from '../components/AdminManager/AdminManagerComponent';
import HostManager from '../components/HostManager/HostManagerComponent';
import House from './Homestay/House';
import Home from "./HomeComponent";
import Footer from "./FooterComponent";
import Booking from "./BookingComponent";
import UpdatedHomepostManager from './HostManager/HomepostUpdate/UpdatedManager';
import HostHeader from './Header/HostHeader'
import {connect} from 'react-redux';
import * as actions from '../redux/ActionCreators';

class Main extends Component {
  componentDidMount(){
    this.props.fetchHomeposts();
    this.props.fetchSystemPromos();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/host" component={HostManager} />
          <Route path="/admin" component={AdminManager} />
          <Route path="/room/:homepostId" component={House} />
          <Route path="/properties"
                 component={() => (
                   <div>
                     <HostHeader />
                     <UpdatedHomepostManager />
                   </div>
                 )}
          />
          <Route path="/booking" component={Booking} />
          <Redirect to='/home'/>
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
export default connect(null, mapDispatchToProps)(Main);
