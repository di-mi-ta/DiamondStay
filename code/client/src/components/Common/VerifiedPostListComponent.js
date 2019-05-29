import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import moment from 'moment';

import { Table, Divider, Button, Icon,
    Popconfirm, Card } from 'antd';

const columns = [{
    title: <b>Homestay</b>,
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: text => <p>{text}</p>,
}, {
    title: <b>Ngày tạo</b>,
    dataIndex: 'timeUpdate',
    key: 'timeUpdate',
    align: 'center',
    render: text => <p>{moment(text).format('LLL')} </p>,
}, {
    title: <b>Duyệt bởi</b>,
    dataIndex: 'confirmedBy',
    key: 'confirmedBy',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    key: 'action',
    align: 'center',
    title: 'Hành động',
    render: (homepost) => (
      <span>
        <Link to={{pathname:`/admin/${homepost._id}`,
                    state: {
                        homepost: homepost
                    }}}
            style={{color: 'white' }}>
            <Button style={{color: 'green'}}>
                <Icon type="security-scan" />
                Duyệt lại
            </Button>
        </Link>
      </span>
    ),
}]

class VerifiedHomepostList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style = {{padding: 50}}>
                <h3> <b> Tin đã duyệt </b></h3>
                <Card style={{
                        boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                        minHeight: '300px',
                        marginTop: 10,
                    }}
                >
                    <Table columns={columns}
                        dataSource={this.props.homeposts.homeposts.filter(home => 
                                                    home.state === 'Success' || home.state === 'Rejected')}
                        bordered
                    />
                </Card>
            </div>
        )
    }

    componentDidMount(){
        this.props.fetchHomeposts();
    }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedHomepostList);
