import React, { Component } from 'react';
import {Table, Button, Icon, Card, Divider, message} from 'antd'; 
import {Link} from 'react-router-dom';
import moment from 'moment';

class Rejected extends Component {
    constructor(props){
        super(props);
        this.onSetCurrentHomepost = this.onSetCurrentHomepost.bind(this);
        this.onSendReqVerify = this.onSendReqVerify.bind(this);
    }

    onSetCurrentHomepost = (homepost) => {
        this.props.updateCurrentHomepost(homepost);
    }

    onSendReqVerify = (homepost) => {
        const updatedHomepost = {
            ...homepost,
            state: 'Waiting'
        }
        this.props.fetchUpdateHomepost(updatedHomepost);
        message.success('Gửi yêu cầu duyệt thành công');
        this.props.fetchHomeposts('?state=Rejected');
    }
    columns = [{
        title: <b>Homestay</b>,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => <b>{text}</b>,
    },
    ,{
        title: <b>Ngày tạo</b>,
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: (text) => <p>{moment(text).format('LLL')}</p>,
    },{
        title: <b>Giá cơ bản</b>,
        dataIndex: 'weekdayPrice',
        key: 'createdAt',
        align: 'center',
        render: (text, record) => <p>{text + ' ' + record.currencyUnit}</p>,
    }
    ,{ 
        title: <b>Hành động</b>,
        key: 'action',
        align: 'center',
        render: (homepost) => {
            return (
            <span>
                <Link  to={`/properties/${homepost._id}/overview`} 
                        style={{color: 'white' }}>
                    <Button style={{color: 'green'}} onClick={() => this.onSetCurrentHomepost(homepost)}>
                        <Icon type="edit" /> 
                        Cập nhật
                    </Button>
                </Link>
                <Divider type="vertical"/>
                <Button style={{color: 'green'}} onClick={() => this.onSendReqVerify(homepost)}>
                    <Icon type="edit" /> 
                    Gửi yêu cầu duyệt
                </Button>
            </span>
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
        this.props.fetchHomeposts('?state=Rejected');
    }
}
  
export default Rejected;

