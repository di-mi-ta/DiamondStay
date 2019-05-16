import React, {Component} from 'react';

import {Table, Divider, Button, Icon, 
         Modal, Input, DatePicker,
         message, InputNumber, Tag,
         Popconfirm, Form, Card} from 'antd';

const RangePicker = DatePicker.RangePicker;

const columns = [{
    title: 'Khách',
    dataIndex: 'renter',
    key: 'renter',
    align: 'center',
    render: text => <b>{text}</b>,
},
{
    title: 'Phòng đặt',
    dataIndex: 'homestay',
    key: 'homestay',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: 'Ngày đến',
    dataIndex: 'startDate',
    key: 'startDate',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: 'Ngày đi',
    dataIndex: 'endDate',
    key: 'endDate',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: 'Tình trạng',
    dataIndex: 'state',
    key: 'state',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: 'Chi tiết',
    dataIndex: 'detail',
    key: 'detail',
    align: 'center',
    render: text => <p>{text}</p>,
}]


class Reservation extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalEditOpen: false,
            currentPromo: '',
        };
    }

    componentWillMount(){
        //this.props.fetchSystemPromos()
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        } 
        const data = []
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50, 
                        paddingBottom: 50, background: '#f1f1f1'}}> 
                <h2> <b> Đặt phòng </b></h2>
                <Divider style={{background: '#cac6c6'}}/>
                <Form layout='inline' style={{ width: '100%'}}>
                        <Form.Item
                            label="Ngày"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleNameChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Khoảng thời gian"
                            {...formItemLayout}
                        >
                            <RangePicker style={{ width: '100%' }} onChange={this.handleDatePickerChange}/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                        >
                            <Button type='primary'> Xem kết quả </Button>
                        </Form.Item>
                </Form>
                <Table columns={columns} 
                    dataSource={data} 
                />
            </div>
        )
    }

}

export default Reservation;
