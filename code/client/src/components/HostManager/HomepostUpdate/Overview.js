import React, {Component} from 'react';
import {Menu} from 'antd';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import Desc from './Overview/Desc';
import RoomBed from './Overview/RoomBed';


class Overview extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        };
    }
    render(){
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50,
                        paddingBottom: 50, background: '#f1f1f1'}}>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode= "horizontal"
                    theme= 'light'
                    style={{
                        textAlign: 'center',
                        background: "#F1F1F1"
                    }}
                >
                    <Menu.Item key="1" to='/'>
                        <Link to='/properties/overview/desc'>
                        <span>
                            <b>Mô tả</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/properties/overview/room-bed'>
                        <span>
                            <b>Phòng và giường</b>
                        </span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route path="/properties/overview/desc" component={Desc} />
                    <Route path="/properties/overview/room-bed" component={RoomBed} />
                    <Redirect to='/properties/overview/desc'/>
                </Switch>
            </div>
        )
    }

}

export default Overview;
