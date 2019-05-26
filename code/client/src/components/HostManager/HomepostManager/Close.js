import React, {Component} from 'react';
import {Table, Button, Icon, Card, Divider, message} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';

class Close extends Component {
    constructor(props){
        super(props);
        this.onSetCurrentHomepost = this.onSetCurrentHomepost.bind(this);
        this.onOpenBtnHome = this.onOpenBtnHome.bind(this);
    }
    onSetCurrentHomepost = (homepost) => {
        this.props.updateCurrentHomepost(homepost);
    }

    onOpenBtnHome = (homepost) => {
        const updatedHomepost = {
            ...homepost,
            state: 'Success'
        }
        this.props.fetchUpdateHomepost(updatedHomepost);
        message.success('Homestay đã chuyển sang trạng thái mở, khách có thể tìm kiếm và đặt phòng!');
        this.props.fetchHomeposts('?state=Hiden');
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
                <Button style={{color: '#ff8c00'}} onClick={() => this.onOpenBtnHome(homepost)}>
                    <Icon type="column-width" /> 
                    Mở
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
        this.props.fetchHomeposts('?state=Hiden');
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
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Close));

