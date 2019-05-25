import React, { Component } from 'react';

import { Table, Button, Icon, Card,} from 'antd'; 

import {Link} from 'react-router-dom';

class All extends Component {
    constructor(props){
        super(props);
        this.onSetCurrentHomepost = this.onSetCurrentHomepost.bind(this);
    }
    onSetCurrentHomepost = (homepost) => {
        this.props.updateCurrentHomepost(homepost);
    }
    columns = [{
        title: 'Homestay',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => <b>{text}</b>,
    },
    ,{
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: text => <p>{text}</p>,
    },{
        title: 'Giá cơ bản',
        dataIndex: 'weekdayPrice',
        key: 'createdAt',
        align: 'center',
        render: text => <p>{text}</p>,
    }
    ,{ 
        title: 'Hành động',
        key: 'action',
        align: 'center',
        render: (homepost) => {
            return (
                <Link  to={`/properties/${homepost._id}`} 
                        style={{color: 'white' }}>
                    <Button style={{color: 'green'}} onClick={() => this.onSetCurrentHomepost(homepost)}>
                        <Icon type="edit" /> 
                        Cập nhật
                    </Button>
                </Link>
            )
        },
    }]
    render(){
        return(
            <div style = {{padding: 50, background: '#f1f1f1'}}>
                <Card style={{ 
                            boxShadow: "1px 3px 1px #9E9E9E",
                            borderRadius: "10px",
                            minHeight: '300px'}}>
                <Table columns={this.columns} 
                    dataSource={this.props.homeposts.homeposts} 
                />
                </Card>
            </div>
        )
    }
    componentDidMount(){
        this.props.fetchHomeposts('?state=Waiting');
    }
}
  
export default All;

