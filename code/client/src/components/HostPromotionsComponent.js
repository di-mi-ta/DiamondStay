import React, { Component } from 'react';

import { Table, Divider, Button, Icon, 
         Modal, Input, DatePicker,
         message, InputNumber, Select, Tag,
         Popconfirm, Form, Card} from 'antd';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class PromotionCompoment extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalEditOpen: false,
            currentPromo: '',
            lstHomeposts: []
        };
        this.onAddPromoBtnClick = this.onAddPromoBtnClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onConfirmDeleteClick = this.onConfirmDeleteClick.bind(this);
        this.onEditBtnClick = this.onEditBtnClick.bind(this);   
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleHomepostChange = this.handleHomepostChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        // alert(JSON.stringify(this.state.lstHomeposts))
    }

    componentWillMount(){
        this.props.fetchHostPromos(this.props.auth.user.username);
    }

    handleDatePickerChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, dateStart: value[0], dateEnd: value[1]}
        })
    }

    handleHomepostChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, homeposts: value}
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
        title: 'Mức khuyến mãi',
        dataIndex: 'value',
        key: 'value',
        align: 'center',
        render: text => text + ' %',
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
        this.props.fetchDeleteHostPromo(promo._id)
    }
      
    onAddPromoBtnClick(){
        let lstHomeposts = this.props.homeposts.homeposts.filter(homepost => 
            homepost.owner === this.props.auth.user.username)
        let lst = lstHomeposts.map(x=>(<Option key={x._id}>{x.name}</Option>));
        this.setState({
            lstHomeposts: lst,
            isModalOpen: true,
        });
    }

    handleOkEdit = () => {
        this.setState({
          isModalEditOpen: false,
        });
        this.props.fetchUpdateHostPromo(this.state.currentPromo);
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
            homeposts: []
        }
        this.props.fetchCreateHostPromo(promo);
        if (true){
            message.success('Bạn đã thêm một khuyến mại mới thành công!');
        } else {
            message.error('Thêm khuyến mại thất bại!');
        }
      }
    
    handleCancel = (e) => {
        this.setState({
            isModalOpen: false,
            lstHomeposts: [], 
        });
    }

    render(){

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        } 

        return(
            <div style={{padding: 50, background: '#f1f1f1'}}>
                <div style={{display:'row'}}> 
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
                            marginTop: '30px'
                            }}>
                    <Table columns={this.columns} 
                        dataSource={this.props.promotions.hostPromotions} 
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
                            label="Mức giảm giá"
                            {...formItemLayout}
                            
                        >
                            <InputNumber min='0' max='100'  
                                        onChange={this.handleValueChange}
                                        style={{ width: '90%' }}
                            />
                            {' %'}
                        </Form.Item>
                        <Form.Item
                            label="Chỗ ở áp dụng"
                            {...formItemLayout}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Chọn nhà bạn muốn áp dụng khuyến mãi"
                                style={{ width: '100%' }}
                                onChange={this.handleHomepostChange}
                                allowClear
                            >
                                {this.state.lstHomeposts}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Thời gian áp dụng"
                            {...formItemLayout}
                        >
                            <RangePicker style={{ width: '100%' }} 
                                        onChange={this.handleDatePickerChange}
                                        format="DD-MM-YYYY"
                                        separator='đến'/>
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
                <Form layout='Horizontal' style={{ width: '100%'}}>
                    <Form.Item
                        label="Tên khuyến mãi"
                        {...formItemLayout}
                    >
                        <Input value={this.state.currentPromo.name} 
                        onChange={this.handleNameChange}/>
                    </Form.Item>
                    <Form.Item
                        label="Mức giảm giá"
                        {...formItemLayout}
                    >
                        <InputNumber min='0' max='100' 
                                    name='value' 
                                    value={this.state.currentPromo.value}
                                    onChange={this.handleValueChange}/>
                        {' %'}
                    </Form.Item>
                    <Form.Item
                        label="Chỗ ở áp dụng"
                        {...formItemLayout}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            allowClear
                            name="homeposts"
                            placeholder='Nhấn vào để xem'
                        >
                            {this.state.lstHomeposts}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Thời gian áp dụng"
                        {...formItemLayout}
                    >
                        <RangePicker style={{ width: '100%' }}
                                    name='dates' 
                                    onChange={this.handleDatePickerChange}
                                    format="DD-MM-YYYY"
                                    separator='đến'
                                    value={[moment(this.state.currentPromo.dateStart), 
                                        moment(this.state.currentPromo.dateEnd)]}
                        />
                    </Form.Item>
                </Form>
                </Modal> 
            </div>
        )
    }

}

export default PromotionCompoment;
