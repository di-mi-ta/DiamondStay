import React, { Component } from 'react';

import { Table, Button, Icon, Card,} from 'antd'; 

import {Link} from 'react-router-dom';

const columns = [{
    title: 'Homestay',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: text => <b>{text}</b>,
},
{
    title: 'Chủ nhà',
    dataIndex: 'owner',
    key: 'owner',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: 'Ngày tạo',
    dataIndex: 'timeUpdate',
    key: 'timeUpdate',
    align: 'center',
    render: text => <p>{text}</p>,
},{ 
    title: 'Hành động',
    key: 'action',
    align: 'center',
    render: (homepost) => (
        <Link to={`/admin/${homepost._id}`} style={{color: 'white' }}>
            <Button style={{color: 'green'}}>
                <Icon type="security-scan" /> 
                Duyệt 
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
            <div style = {{padding: 50, background: '#f1f1f1'}}>
                <Card style={{ 
                            boxShadow: "1px 3px 1px #9E9E9E",
                            borderRadius: "10px",
                            minHeight: '300px'}}>
                <Table columns={columns} 
                        dataSource={
                            this.props.homeposts.homeposts.filter(
                                homepost => homepost.state === 'waiting'
                        )}  
                />
                </Card>
            </div>
        )
    }
}
  
export default WaitingHomepostList;

