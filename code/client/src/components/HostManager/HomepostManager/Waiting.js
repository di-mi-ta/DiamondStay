import React, {Component} from 'react';
import {Table, Button, Icon, Card, Divider, message, Popover} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';

class Waiting extends Component {
    constructor(props){
        super(props);
        this.onSetCurrentHomepost = this.onSetCurrentHomepost.bind(this);
        this.onCancelReqVerify = this.onCancelReqVerify.bind(this);
        this.onDeleteHome = this.onDeleteHome.bind(this);
    }
    onSetCurrentHomepost = (homepost) => {
        this.props.updateCurrentHomepost(homepost);
    }

    onDeleteHome = (homepost) => {
        this.props.fetchDeleteHomepost(homepost);
    }

    onCancelReqVerify = (homepost) => {
        const updatedHomepost = {
            ...homepost,
            state: 'New'
        }
        this.props.fetchUpdateHomepost(updatedHomepost);
        message.success('Bạn đã hủy bỏ yêu cầu duyệt thành công đối với nhà này!');
    }
    columns = [{
        title: <b>Homestay</b>,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text =>  (<Popover content={text}
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
                <Button style={{color: '#1F87EF'}} onClick={() => this.onCancelReqVerify(homepost)}>
                    <Icon type="stop" /> 
                    Hủy bỏ
                </Button>
                <Divider type="vertical"/>
                <Button style={{color: '#EF1F3B'}} onClick={() => this.onDeleteHome(homepost)}>
                    <Icon type="close" /> 
                    Xóa
                </Button>
            </span>
            )
        },
    }]
    render(){
        let data = this.props.homeposts.homeposts.filter((home) => 
                home.owner === this.props.auth.user.username && home.state === 'Waiting')
        return(
            <div style = {{padding: 50}}>
                <Card style={{ 
                            boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                            minHeight: '300px'}}>
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
    fetchDeleteHomepost: (homepost) => {dispatch(actions.fetchDeleteHomepost(homepost))},
    updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Waiting));
