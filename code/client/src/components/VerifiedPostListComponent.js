import React, { Component } from 'react';

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
    render: text => <a href="javascript:;">{text}</a>,
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
            <div className='container'>
                <Card style={{marginTop: '20px', 
                                    boxShadow: "1px 3px 1px #9E9E9E",
                                    marginRight: '10px',
                                    borderRadius: "10px",
                                    minHeight: '300px'}}>
                    <Table columns={columns} 
                        dataSource={this.props.homeposts.homeposts} 
                    />
                </Card>
            </div>
        )
    }
}
  
export default VerifiedHomepostList;

