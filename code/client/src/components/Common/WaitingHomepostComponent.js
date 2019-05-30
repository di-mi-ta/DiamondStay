import React, { Component } from 'react';
import { Table, Button, Icon, Card, Divider} from 'antd';
import {connect} from 'react-redux';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import * as actions from '../../redux/ActionCreators';
import moment from 'moment';

class WaitingHomepostList extends Component {
    columns = [{
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
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: text => <p>{moment(text).format('LLL')}</p>,
    },{
        title: 'Hành động',
        key: 'action',
        align: 'center',
        render: (homepost) => (
            <Link to={{pathname:`/admin/${homepost._id}`,
                        state: {
                            homepost: homepost
                        }}}
                style={{color: 'white' }}>
                <Button style={{color: 'green'}}>
                    <Icon type="security-scan" />
                    Duyệt
                </Button>
            </Link>
        ),
    }]
    render(){
        let data = this.props.homeposts.homeposts.filter(home => home.state === 'Waiting');
        return(
            <div style = {{padding: 50}}>
                <h3> <b> Tin đợi duyệt </b></h3>
                <Card style={{
                        boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                        minHeight: '300px',
                        marginTop: 10,
                    }}
                >
                    <Table columns={this.columns}
                        dataSource={data}
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
  auth: state.auth,
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))},
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitingHomepostList);
