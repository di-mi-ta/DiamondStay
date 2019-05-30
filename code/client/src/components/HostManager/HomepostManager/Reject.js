import React, {Component} from 'react';
import {Table, Button, Icon, Card, Divider, Modal, Tag, Popover} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';

class Rejected extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpenModal: false,
            currentHome: null
        }
        this.onDeleteRejectedHome = this.onDeleteRejectedHome.bind(this);
    }

    onDeleteRejectedHome = (homepost) => {
        this.props.fetchDeleteHomepost(homepost);
    }

    columns = [{
        title: <b>Homestay</b>,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => (<Popover content={text}
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
                <Button style={{color: '#E31B36'}} onClick={() => this.onDeleteRejectedHome(homepost)}>
                    <Icon type="delete" /> 
                    Xóa
                </Button>
                <Divider type="vertical"/>
                <Button style={{color: 'green'}} onClick={() => {
                            this.setState({
                                isOpenModal: true,
                                currentHome: {
                                    ...homepost,
                                    note: JSON.parse(homepost.note),
                                    verifyRes: JSON.parse(homepost.verifyRes)
                                }
                            })
                        }}>
                    <Icon type="edit" /> 
                    Kết quả duyệt
                </Button>
            </span>
            )
        },
    }]

    resColumns = [{
        title: <b>Trường</b>,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => <b>{text}</b>,
    },
    ,{
        title: <b>Báo cáo</b>,
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: (text) => <p>{moment(text).format('LLL')}</p>,
    },{
        title: <b>Kết quả</b>,
        dataIndex: 'weekdayPrice',
        key: 'createdAt',
        align: 'center',
        render: (text, record) => <p>{text + ' ' + record.currencyUnit}</p>,
    }]

    handleOk = (e) => {
        this.setState({
          isOpenModal: false
        });
    }

    handleCancel = (e) => {
        this.setState({
            isOpenModal: false,
        });
    }

    render(){
        const resColumns = [{
            title: <b>Trường thông tin</b>,
            dataIndex: 'field',
            align: 'center',
            key: 'field',
            render: (text) => text
        }, {
            title: <b>Phản hồi</b>,
            dataIndex: 'response',
            key: 'response',
            align: 'center',
            render: (text) => (<Popover content={text}>
                <p>
                    {
                        text.length > 10 ?
                        text.substr(0,9) + '...':
                        text
                    }
                </p>
            </Popover>)
        },{
            title: 'Trạng thái',
            key: 'states',
            dataIndex: 'states',
            align: 'center',
            render: states => (
              <span>
                {states.map(state => {
                  let color = '';
                  if (state === "HỢP LỆ") {
                    color = 'green';
                  } if (state === "CHƯA XÁC NHẬN") {
                    color = 'geekblue';
                  }
                  else if (state === "KHÔNG HỢP LỆ"){
                    color = 'volcano';
                  }
                  return <Tag color={color} key={state}>{state.toUpperCase()}</Tag>;
                })}
              </span>
            ),
        }];

        const data = [{
            key: 'field',
            field: 'Mô tả',
            response: !this.state.currentHome ? 'Không có' : this.state.currentHome.note.description,
            states: [!this.state.currentHome ? 'CHƯA XÁC NHẬN' : this.state.currentHome.verifyRes.description],
        },{
            key: 'field',
            field: 'Hình ảnh',
            response: !this.state.currentHome ? 'Không có' : this.state.currentHome.note.image,
            states: [!this.state.currentHome ? 'CHƯA XÁC NHẬN' : this.state.currentHome.verifyRes.image],
        },{
            key: 'field',
            field: 'Thông tin cơ bản',
            response: !this.state.currentHome ? 'Không có' : this.state.currentHome.note.basicInfo,
            states: [!this.state.currentHome ? 'CHƯA XÁC NHẬN' : this.state.currentHome.verifyRes.basicInfo],
        },{
            key: 'field',
            field: 'Giá',
            response: !this.state.currentHome ? 'Không có' : this.state.currentHome.note.price,
            states: [!this.state.currentHome ? 'CHƯA XÁC NHẬN' : this.state.currentHome.verifyRes.price],
        },{
            key: 'field',
            field: 'Phòng và giường',
            response: !this.state.currentHome ? 'Không có' : this.state.currentHome.note.roomBedInfo,
            states: [!this.state.currentHome ? 'CHƯA XÁC NHẬN' : this.state.currentHome.verifyRes.roomBedInfo],
        }, {
            key: 'field',
            field: 'Vị trí',
            response: !this.state.currentHome ? 'Không có' : this.state.currentHome.note.location,
            states: [!this.state.currentHome ? 'CHƯA XÁC NHẬN' : this.state.currentHome.verifyRes.location],
        }];
        return(
            <div style = {{padding: 50}}>
                <Card style={{ 
                            boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                            minHeight: '300px'}}>
                <Table columns={this.columns} 
                    dataSource={this.props.homeposts.homeposts.filter(home => home.state === 'Success')} 
                    bordered
                />
                </Card>
                <Modal
                    title={<b>Kết quả duyệt tin</b>}
                    visible={this.state.isOpenModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width='60%'
                    footer={null}
                >
                    <Table columns={resColumns} 
                        dataSource={data} 
                        bordered
                    />
                </Modal>
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
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Rejected));
