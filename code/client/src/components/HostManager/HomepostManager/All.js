import React, { Component } from 'react';

import { Table, Button, Icon, Card, Popover, Tag} from 'antd';
import moment from 'moment';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

class All extends Component {
    constructor(props){
        super(props);
        this.onSetCurrentHomepost = this.onSetCurrentHomepost.bind(this);
    }
    onSetCurrentHomepost = (homepost) => {
        this.props.updateCurrentHomepost(homepost);
    }
    columns = [{
        title: <b>Homestay</b>,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => (<Popover content={text}
            ><p>
                {
                    text.length > 20 ?
                    text.substr(0,19) + '...':
                    text
                }
            </p>
        </Popover>),
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
    },{
        title: <b>Tình trạng nhà</b>,
        dataIndex: 'state',
        key: 'state',
        align: 'center',
        // hard code payment status
        render: text => text === 'Success' ? <Tag style={{width: 120}} color='green' > MỞ </Tag> : 
                        text === 'New' ? <Tag style={{width: 120}} color='#0E19B9' > MỚI </Tag> :
                        text === 'Hiden' ? <Tag style={{width: 120}} color='#D5E21B' > ĐÓNG </Tag> :
                        text === 'Waiting' ? <Tag style={{width: 120}} color='#1ADBF0' > ĐỢI DUYỆT </Tag> :
                        text === 'Rejected' ? <Tag style={{width: 120}} color='#F01A2F' > BỊ TỪ CHỔI </Tag> :
                        <Tag color= 'red' > KHÔNG CÓ THÔNG TIN </Tag>,
    },{ 
        title: <b>Hành động</b>,
        key: 'action',
        align: 'center',
        render: (homepost) => {
            return (
                <Link  to={`/properties/${homepost._id}/overview`} 
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
        let data = this.props.homeposts.homeposts.filter((home) => 
                home.owner === this.props.auth.user.username && 
                (home.state === 'Success' || home.state === 'New' || 
                home.state === 'Hiden' || home.state === 'Rejected' || home.state === 'Waiting'))
        return(
            <div style = {{padding: 50}}>
                <Card style={{
                            boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                            minHeight: '300px', padding: 5}}>
                <Table columns={this.columns}
                    dataSource={data}
                    bordered
                />
                </Card>
            </div>
        )
    }
    componentWillMount(){
        this.props.fetchHomeposts();
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))},
  updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(All));
