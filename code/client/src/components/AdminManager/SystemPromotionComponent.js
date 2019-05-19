import React, {Component} from 'react';

import {Table, Divider, Button, Icon, 
         Modal, Input, DatePicker,
         message, InputNumber, Tag,
         Popconfirm, Form, Card} from 'antd';

const RangePicker = DatePicker.RangePicker;

class SystemPromotionCompoment extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalEditOpen: false,
            currentPromo: '',
        };
        this.onAddPromoBtnClick = this.onAddPromoBtnClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onConfirmDeleteClick = this.onConfirmDeleteClick.bind(this);
        this.onEditBtnClick = this.onEditBtnClick.bind(this);   
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMinValueChange = this.handleMinValueChange.bind(this);
        this.handleNumTimeChange = this.handleNumTimeChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }

    componentWillMount(){
        this.props.fetchSystemPromos();
    }

    handleDatePickerChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, dateStart: value[0], dateEnd: value[1]}
        })
    }

    handleMinValueChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, minValueBooking: value}
        })
    }

    handleNumTimeChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, maxNumBookingApplied: value}
        })
    }

    handleCodeChange = e => {
        this.setState({
            currentPromo: {...this.state.currentPromo, code: e.target.value}
        })
    }

    handleValueChange  = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, value: value}
        })
    }

    handleNameChange  = e => {
        this.setState({
            currentPromo: {...this.state.currentPromo, name: e.target.value}
        })
    }


    columns = [{
        title: 'Tên khuyến mãi',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => text,
    },{
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        render: text => text,
    },{
        title: 'Tình trạng',
        key: 'states',
        dataIndex: 'dateEnd',
        align: 'center',
        render: (dateEnd, row) =>{
            let now = new Date();
            let dateStart = row.dateStart;
            if (now <= new Date(dateEnd) && now >= new Date(dateStart)){
                return <Tag color='green' > ĐANG DIỄN RA </Tag>   
            }
            else if (now < new Date(dateStart)){
                return <Tag color='yellow' > TRONG TƯƠNG LAI </Tag>  
            }
            else {
                return <Tag color='red' > ĐÃ KẾT THÚC </Tag>  
            }
        }    
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

    onEditBtnClick = () => {
        this.setState({
            isModalEditOpen: true,
        })
    }

    onConfirmDeleteClick = (promo) => {
        this.props.fetchDeleteSystemPromo(promo._id)
    }
      
    onAddPromoBtnClick(){
        this.setState({
            isModalOpen: true,
        });
    }

    handleOkEdit = () => {
        this.setState({
          isModalEditOpen: false,
        });
        this.props.fetchUpdateSystemPromo(this.state.currentPromo);
        if (true){
            message.success('Cập nhật thành công !!!');
        } else {
            message.error('Cập nhật thất bại !!!');
        }
      }
    
    handleCancelEdit = () => {
        this.setState({
            isModalEditOpen: false 
        });
    }

    handleOk = (e) => {
        this.setState({
          isModalOpen: false,
        });
        const promo = {
            name: this.state.currentPromo.name,
            dateStart: this.state.currentPromo.dateStart,
            dateEnd: this.state.currentPromo.dateEnd,
            value: this.state.currentPromo.value,
            creator: this.props.auth.user.username,
            minValueBooking: this.state.currentPromo.minValueBooking,
            maxNumBookingApplied: this.state.currentPromo.maxNumBookingApplied,
            code: this.state.currentPromo.code
        }
        this.props.fetchCreateSystemPromo(promo);
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
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50, 
                        paddingBottom: 50, background: '#f1f1f1'}}>
                <div style={{flex: 'row'}}> 
                    <h2> <b> Quản lí khuyến mại </b></h2>
                    <Button type="primary" icon="plus" ghost
                        onClick = {this.onAddPromoBtnClick}
                    >
                    Thêm khuyến mại
                </Button>
                </div>
                <Card style={{ 
                    boxShadow: "1px 3px 1px #9E9E9E",
                    borderRadius: "10px",
                    minHeight: '300px',
                    marginTop: '30px'}}>
                    <Table columns={this.columns} 
                        dataSource={this.props.promotions.systemPromos} 
                        style={{marginTop: '20px', backgroundColor: 'while'}}
                        bordered
                    />
                </Card>
                <Modal
                    title="Thêm khuyến mại"
                    visible={this.state.isModalOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width='60%'
                    okText='Thêm'
                    cancelText='Hủy bỏ'
                >
                    <Form layout='Horizontal' style={{ width: '100%'}} onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="Tên khuyến mãi"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleNameChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Code"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleCodeChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Giá trị booking tối thiểu"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' max='100'  onChange={this.handleMinValueChange}/>
                            VND
                        </Form.Item>
                        <Form.Item
                            label="Giá trị khuyến mãi"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleValueChange}/>
                            VND 
                        </Form.Item>
                        <Form.Item
                            label="Số lần sử dụng tối đa"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleNumTimeChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Thời gian áp dụng"
                            {...formItemLayout}
                        >
                            <RangePicker style={{ width: '100%' }} onChange={this.handleDatePickerChange}/>
                        </Form.Item>
                        </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa khuyến mãi"
                    visible={this.state.isModalEditOpen}
                    onOk={this.handleOkEdit}
                    onCancel={this.handleCancelEdit}
                    width='60%'
                    okText='Cập nhật'
                    cancelText='Hủy bỏ'
                > 
                <Form layout='Horizontal' style={{ width: '100%'}} onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="Tên khuyến mãi"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleNameChange} value={this.state.currentPromo.name}/>
                        </Form.Item>
                        <Form.Item
                            label="Code"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleCodeChange} value={this.state.currentPromo.code}/>
                        </Form.Item>
                        <Form.Item
                            label="Giá trị booking tối thiểu"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleMinValueChange}
                                        value={this.state.currentPromo.minBookingApplied}/>
                            {' VND'}
                        </Form.Item>
                        <Form.Item
                            label="Giá trị khuyến mãi"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleValueChange}
                                                value={this.state.currentPromo.value}/>
                            {' VND'} 
                        </Form.Item>
                        <Form.Item
                            label="Số lần sử dụng tối đa"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleNumTimeChange}
                                                value={this.state.currentPromo.maxNumBookingApplied}/>
                        </Form.Item>
                        <Form.Item
                            label="Thời gian áp dụng"
                            {...formItemLayout}
                        >
                            <RangePicker style={{ width: '100%' }} onChange={this.handleDatePickerChange}/>
                        </Form.Item>
                        </Form>
                </Modal> 
            </div>
        )
    }

}

export default SystemPromotionCompoment;
