import React, {Component} from 'react';
import {Table, Button, Icon, Card, Divider, message} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';

class Rejected extends Component {
    constructor(props){
        super(props);
        this.onDeleteRejectedHome = this.onDeleteRejectedHome.bind(this);
        this.onViewVerifyResult = this.onViewVerifyResult.bind(this);
    }

    onDeleteRejectedHome = (homepost) => {
        this.props.fetchDeleteHomepost(homepost);
    }

    onViewVerifyResult = (homepost) => {
        alert(JSON.parse(homepost.note).description)
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
                <Button style={{color: '#E31B36'}} onClick={() => this.onDeleteRejectedHome(homepost)}>
                    <Icon type="delete" /> 
                    Xóa
                </Button>
                <Divider type="vertical"/>
                <Button style={{color: 'green'}} onClick={() => this.onViewVerifyResult(homepost)}>
                    <Icon type="edit" /> 
                    Kết quả duyệt
                </Button>
            </span>
            )
        },
    }]
    render(){
        return(
            <div style = {{padding: 50}}>
                <Card style={{ 
                            boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                            minHeight: '300px'}}>
                <Table columns={this.columns} 
                    dataSource={this.props.homeposts.homeposts.filter(home => home.state === 'Rejected')} 
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
    fetchDeleteHomepost: (homepost) => {dispatch(actions.fetchDeleteHomepost(homepost))},
    updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Rejected));
