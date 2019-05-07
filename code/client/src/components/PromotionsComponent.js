import React, { Component } from 'react';

import { Table, Divider, Button, Icon, 
         Modal, Form, Input, DatePicker,
         message, InputNumber, Select, Tag,
         Popconfirm } from 'antd';

const InputGroup = Input.Group;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;


class PromotionCompoment extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            children: [],
        };
        this.onAddPromoBtnClick = this.onAddPromoBtnClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleChangeSelectHome = this.handleChangeSelectHome.bind(this);
        this.onConfirmDeleteClick = this.onConfirmDeleteClick.bind(this);
    }

    columns = [{
        title: 'Tên khuyến mãi',
        dataIndex: 'namePromo',
        key: 'name',
        align: 'center',
        render: text => text,
    },{
        title: 'Tình trạng',
        key: 'states',
        dataIndex: ['endDate','startDate'],
        render: (startDate , endDate) => 
            <Tag color='green' >{startDate}</Tag>
    },{
          title: 'Mức khuyến mãi',
          dataIndex: 'value',
          key: 'value',
          align: 'center',
          render: text => <a href="javascript:;">{text}</a>,
    },{
        key: 'action',
        align: 'center',
        title: 'Hành động',
        render: (text, record) => (
          <span>
             <Popconfirm title="Bạn chắc chắn muốn xóa chứ？" okText="Xóa" cancelText="Hủy bỏ" onConfirm = {this.onConfirmDeleteClick}>
                  <Button ghost> <Icon type="delete"  style={{ color: '#DC143C' }} theme="filled" /> </Button>
             </Popconfirm>
            <Divider type="vertical" />
            <Button ghost> <Icon type="edit" style={{ color: '#FF8C00' }} theme="filled"/> </Button>
          </span>
        ),
    }];

    onConfirmDeleteClick(){
        this.props.deletePromo('12');
    }
      
    handleChangeSelectHome(value) {
        console.log(`selected ${value}`);
    }

    onAddPromoBtnClick(){
        this.setState({
            isModalOpen: true,
        });
    }

    handleOk = (e) => {
        this.setState({
          isModalOpen: false,
        });
        if (true){
            message.success('Bạn đã thêm một khuyến mại mới thành công!');
        } else {
            message.error('Thêm khuyến mại thất bại!');
        }
      }
    
    handleCancel = (e) => {
        this.setState({
            isModalOpen: false,
        });
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        } 

        return(
            <div className='container' padding-top='10px'>
                <div style={{display:'inline'}}> 
                <h2> <b> Quản lí khuyến mại </b></h2>
                    <Button type="primary" icon="plus" ghost
                        onClick = {this.onAddPromoBtnClick}
                    >
                    Thêm khuyến mại
                </Button>
                </div>
                <Table columns={this.columns} 
                    dataSource={this.props.promotions.promotions} 
                    style={{marginTop: '20px'}}
                />
                <Modal
                    title="Thêm khuyến mại"
                    visible={this.state.isModalOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width='60%'
                    okText='Thêm'
                    cancelText='Hủy bỏ'
                >
                    <Form layout='Horizontal' style={{ width: '100%'}}>
                        <Form.Item
                            label="Tên khuyến mãi"
                            {...formItemLayout}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Mức giảm giá"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' max='100'/>
                            {' %'}
                        </Form.Item>
                        <Form.Item
                            label="Chỗ ở áp dụng"
                            {...formItemLayout}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                onChange={this.handleChangeSelectHome}
                                allowClear
                            >
                                {this.state.children}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Thời gian áp dụng"
                            {...formItemLayout}
                        >
                            <RangePicker style={{ width: '100%' }}/>
                        </Form.Item>
                        </Form>
                </Modal>
            </div>
        )
    }

}

export default PromotionCompoment;
