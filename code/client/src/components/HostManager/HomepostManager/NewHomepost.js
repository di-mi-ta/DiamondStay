import React, {Component} from 'react';
import {Table, Divider, Button, Icon, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

class NewHome extends Component{
    constructor(props){
        super(props);
    }

    columns = [{
        title: 'Homestay',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => text,
    },{
        title: 'Cập nhật lần cuối',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        align: 'center',
        render: text => text,
    },{
        title: 'Giá',
        key: 'weekdayPrice',
        dataIndex: 'weekdayPrice',
        align: 'center',
        render: text => text,
    },{
        key: 'action',
        align: 'center',
        title: 'Hành động',
        render: (text, record) => (
          <span>
             <Popconfirm title="Bạn chắc chắn muốn xóa chứ？"
                        okText="Xóa" cancelText="Hủy bỏ"
                        onConfirm = {() => this.onConfirmDeleteClick(record)}>
                  <Button ghost> <Icon type="delete"
                        style={{ color: '#DC143C' }} theme="filled" /> </Button>
             </Popconfirm>
            <Divider type="vertical"/>
            <Button ghost onClick={()=> {this.setState({currentPromo: record}); this.onEditBtnClick()}}>
                <Icon type="edit" style={{ color: '#FF8C00' }}
                    theme="filled"/>
            </Button>
          </span>
        ),
    }];

    render(){
        return(
            <div className="container">
                <Table columns={this.columns}
                        dataSource={this.props.homeposts.homeposts}
                        style={{marginTop: '20px', backgroundColor: 'while'}}
                        bordered
                />
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(NewHome);
