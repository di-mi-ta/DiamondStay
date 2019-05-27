import React, {Component} from 'react';
import {Menu} from 'antd';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import Desc from './Overview/Desc';
import RoomBed from './Overview/RoomBed';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

class Overview extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            key: [1]
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
        this.setState({
            key: [selectedKeys],
        })
    }

    render(){
        return(
            <div style={{paddingLeft: 50, paddingRight: 50,
                        paddingBottom: 50}}>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode= "horizontal"
                    theme= 'light'
                    selectedKeys={this.state.key}
                    onSelect={this.onSelect}
                    style={{
                        textAlign: 'center',
                        boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                        marginBottom: 20
                    }}
                >
                    <Menu.Item key="1" to='/'>
                        <Link to={`/properties/${this.props.match.params.homepostId}/overview/desc`}>
                        <span>
                            <b>Mô tả</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={`/properties/${this.props.match.params.homepostId}/overview/room-bed`}>
                        <span>
                            <b>Phòng và giường</b>
                        </span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route  path={`/properties/${this.props.match.params.homepostId}/overview/desc`}  
                            component={Desc} />
                    <Route  path={`/properties/${this.props.match.params.homepostId}/overview/room-bed`}  
                            component={RoomBed} />
                    <Redirect to={`/properties/${this.props.match.params.homepostId}/overview/desc`}/>
                </Switch>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    homeposts: state.homeposts,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Overview);
