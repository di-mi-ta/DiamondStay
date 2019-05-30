import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import {Table, Divider, Select, DatePicker, Form, Card, Tag, Row, Col} from 'antd';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

function getDateAt12AM(dateString) {
    const date = new Date(dateString);
    date.setHours(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
    return date;
}
  

const columns = [{
    title: <b>Khách</b>,
    dataIndex: 'renter.firstName',
    key: 'renter',
    align: 'center',
    render: (text, record) => <b>{record.renter.firstName + ' ' + record.renter.lastName}</b>,
},{
    title: <b>Phòng đặt</b>,
    dataIndex: 'home.name',
    key: 'homestay',
    align: 'center',
    render: text => <p>{text}</p>,
},{
    title: <b>Ngày đến</b>,
    dataIndex: 'dateCheckin',
    key: 'dateCheckin',
    align: 'center',
    render: text => moment(text).format('LL'),
},{
    title: <b>Ngày đi</b>,
    dataIndex: 'dateCheckout',
    key: 'dateCheckout',
    align: 'center',
    render: text => moment(text).format('LL'),
},{
    title: <b>Tình trạng thanh toán</b>,
    key: 'paymentStatus',
    align: 'center',
    // hard code payment status
    render: text => 'Đã thanh toán' === 'Đã thanh toán' ? <Tag color='green' > ĐÃ THANH TOÁN </Tag> : 
                        <Tag color='red' > CHƯA THANH TOÁN </Tag>,
}]


class Reservation extends Component {
    constructor(props){
        super(props);
        this.state = {
            typeFilter: 'Ngày đến',
            startDate: null,
            endDate: null,
        };
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectTypeCheck = this.handleSelectTypeCheck.bind(this);
    }

    handleDatePickerChange = data => {
        this.setState({
            startDate: getDateAt12AM(data[0]),
            endDate: getDateAt12AM(data[1])
        })
    }

    handleSelectTypeCheck = value => {
        this.setState({
            typeFilter: value
        })
    }

    componentDidMount(){
        this.props.fetchLstBookingForHost();
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        let data = this.props.lstBookings;
        if (this.state.startDate !== null && this.state.endDate !== null){
            data = this.props.lstBookings.filter(booking => {
                if (this.state.typeFilter === 'Ngày đến'){
                    return moment(getDateAt12AM(booking.dateCheckin))
                            .isBetween(this.state.startDate, this.state.endDate, null, '[]')
                } else {
                    return moment(getDateAt12AM(booking.dateCheckout))
                            .isBetween(this.state.startDate, this.state.endDate, null, '[]')
                }
            })
        }
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50,
                        paddingBottom: 50}}> 
                <Row>
                  <Col span={6}> 
                    <h3> <b> Quản lí đặt chỗ </b></h3>
                  </Col>
                  <Col span={6} offset={12}>
                    <h4>Tổng cộng: <b>{data.length}</b></h4>
                  </Col>
                </Row>
                <Divider/>
                <Card style={{
                    boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                    minHeight: '300px',
                    marginTop: '30px'}}>
                <Form layout='inline' style={{ width: '100%'}}>
                    <Form.Item
                        label="Ngày"
                    >
                        <Select onChange={this.handleSelectTypeCheck} style={{ width: '100%'}} value="Ngày đến">
                            <Option value="Ngày đến">Ngày đến</Option>
                            <Option value="Ngày đi">Ngày đi</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Khoảng thời gian"
                    >
                        <RangePicker style={{ width: '100%' }} 
                                    format="DD-MM-YYYY"
                                    onChange={this.handleDatePickerChange}/>
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
  lstBookings: state.booking.lstBookings
});

const mapDispatchToProps = (dispatch) => ({
    fetchLstBookingForHost: () =>  dispatch(actions.fetchLstBookingForHost())
});

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
