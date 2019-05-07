import React, { Component } from 'react';

import { Table, Divider, Button, Icon, 
         Modal, Form, Input, Radio, DatePicker,
         message} from 'antd'; 

import {Route, Link, Switch, Redirect} from 'react-router-dom';



const columns = [{
    title: 'Homestay',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: text => <p>{text}</p>,
}, {
    title: 'Ngày tạo',
    dataIndex: 'timeUpdate',
    key: 'timeUpdate',
    align: 'center',
    render: text => <a href="javascript:;">{text}</a>,
},{
    key: 'action',
    align: 'center',
    render: (homepost) => (
        <Link to={`/admin/${homepost._id}`} style={{color: 'white' }}>
            <Button style={{color: 'green'}}>
                <Icon type="security-scan" /> 
                Verify 
            </Button>
        </Link>
    ),
}]

class WaitingHomepostList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='container'>
                <Table columns={columns} 
                    dataSource={this.props.homeposts.homeposts} 
                />
            </div>
        )
    }
}
  
export default WaitingHomepostList;

