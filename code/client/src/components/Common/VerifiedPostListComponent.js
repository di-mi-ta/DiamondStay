import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import moment from 'moment';

import { Table, Divider, Button, Icon,
    Popconfirm, Card } from 'antd';

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
    render: text => <p>{moment(text).format('LLL')} </p>,
},{
    key: 'action',
    align: 'center',
    title: 'Hành động',
    render: (text, record) => (
      <span>
         <Popconfirm title="Bạn chắc chắn muốn xóa chứ？"
                    okText="Xóa" cancelText="Hủy bỏ"
                    onConfirm = {this.onConfirmDeleteClick}>
              <Button ghost> <Icon type="delete"
                    style={{ color: '#DC143C' }} theme="filled" /> </Button>
         </Popconfirm>
        <Divider type="vertical" />
        <Button ghost onClick={this.onEditBtnClick}>
            <Icon type="edit" style={{ color: '#FF8C00' }}
                theme="filled"/>
        </Button>
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
                        dataSource={this.props.homeposts.homeposts}
                        bordered
                    />
                </Card>
            </div>
        )
    }

    componentDidMount(){
        this.props.fetchHomeposts('?state=Success');
    }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedHomepostList);
