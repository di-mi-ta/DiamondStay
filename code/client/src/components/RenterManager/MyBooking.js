import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import {Table, Divider, Button, DatePicker, Form, Card, Select} from 'antd';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const columns = [
{
    title: <b>Phòng đặt</b>,
    dataIndex: 'homestay',
    key: 'homestay',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: <b>Ngày đến</b>,
    dataIndex: 'startDate',
    key: 'startDate',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: <b>Ngày đi</b>,
    dataIndex: 'endDate',
    key: 'endDate',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: <b>Tình trạng thanh toán</b>,
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: <b>Chi tiết</b>,
    dataIndex: 'detail',
    key: 'detail',
    align: 'center',
    render: text => <p>{text}</p>,
}]


class MyBooking extends Component {
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
        
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        const data = []
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50,
                        paddingBottom: 50}}>
                <h3> <b> Đặt chỗ của tôi</b></h3>
                <Divider/>
                <Card style={{
                    boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                    minHeight: '300px',
                    marginTop: '30px'}}>
                <Form layout='inline' style={{ width: '100%'}}>
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
                    bordered
                />
                </Card>
            </div>
        )
    }

}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBooking);
