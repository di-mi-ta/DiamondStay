import React, { Component } from 'react';
import { Steps, Icon, Button, Input,
        Radio, Row, Col, Card,
        Modal, Table, Tag,
        message, Popover, Carousel} from 'antd';

import {Form} from 'semantic-ui-react'
import '../../css/verifyHome.css';
import {baseUrl} from '../../shared/baseUrl';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import {withRouter} from 'react-router-dom';

const Step = Steps.Step;
const ButtonGroup = Button.Group;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

class VerifyHomepostComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentStep: 0,
            homepost: this.props.location.state.homepost,
            canBack: false,
            canNext: true,
            fieldVerify: 'Mô tả',
            isOpenModal: false,
            verifiedResult: {
                description: 'CHƯA XÁC NHẬN',
                image: 'CHƯA XÁC NHẬN',
                location: 'CHƯA XÁC NHẬN',
                basicInfo: 'CHƯA XÁC NHẬN',
                roomBedInfo: 'CHƯA XÁC NHẬN',
                price: 'CHƯA XÁC NHẬN',
            },
            valueRatio: {
                description: -1,
                image: -1,
                location: -1,
                basicInfo: -1,
                roomBedInfo: -1,
                price: -1,
            },
            
        }
        this.renderContent = this.renderContent.bind(this);
        this.onNextBtnClicked = this.onNextBtnClicked.bind(this);
        this.onBackBtnClicked = this.onBackBtnClicked.bind(this);
        this.onChangeRatio = this.onChangeRatio.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onConfirmedClick = this.onConfirmedClick.bind(this);
        this.onRejectedClick = this.onRejectedClick.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
    }

    componentWillMount(){
        this.setState({
            noteResult: this.state.homepost.note === '' ? {
                description: '',
                image: '',
                location: '',
                basicInfo: '',
                roomBedInfo: '',
                price: '',
            } :
            {
                description: JSON.parse(this.state.homepost.note).description,
                image: JSON.parse(this.state.homepost.note).image,
                location: JSON.parse(this.state.homepost.note).location,
                basicInfo: JSON.parse(this.state.homepost.note).basicInfo,
                roomBedInfo: JSON.parse(this.state.homepost.note).roomBedInfo,
                price: JSON.parse(this.state.homepost.note).price,
            }
        })
    }

    onNoteChange = e => {
        if (this.state.currentStep === 0){
            this.setState({
                noteResult: {...this.state.noteResult, description: e.target.value}
            })
        } else if (this.state.currentStep === 1){
            this.setState({
                noteResult: {...this.state.noteResult, image: e.target.value}
            })
        } else if (this.state.currentStep === 2){
            this.setState({
                noteResult: {...this.state.noteResult, basicInfo: e.target.value}
            })
        } else if (this.state.currentStep === 3){
            this.setState({
                noteResult: {...this.state.noteResult, price: e.target.value}
            })
        } else if (this.state.currentStep === 4){
            this.setState({
                noteResult: {...this.state.noteResult, roomBedInfo: e.target.value}
            })
        } else if (this.state.currentStep === 5){
            this.setState({
                noteResult: {...this.state.noteResult, location: e.target.value}
            })
        }
    }

    onChangeRatio(e){
        let res = 'CHƯA XÁC NHẬN'
        if (e.target.value === 1){
            res = 'HỢP LỆ'
        } else if (e.target.value === 0){
            res = 'KHÔNG HỢP LỆ'
        }
        if (this.state.currentStep === 0){
            this.setState({
                verifiedResult: {...this.state.verifiedResult, description: res},
                valueRatio: {...this.state.valueRatio, description: e.target.value},
            })
        } else if (this.state.currentStep === 1){
            this.setState({
                verifiedResult: {...this.state.verifiedResult, image: res},
                valueRatio: {...this.state.valueRatio, image: e.target.value}
            })
        } else if (this.state.currentStep === 2){
            this.setState({
                verifiedResult: {...this.state.verifiedResult, basicInfo: res},
                valueRatio: {...this.state.valueRatio, basicInfo: e.target.value}
            })
        } else if (this.state.currentStep === 3){
            this.setState({
                verifiedResult: {...this.state.verifiedResult, price: res},
                valueRatio: {...this.state.valueRatio, price: e.target.value}
            })
        } else if (this.state.currentStep === 4){
            this.setState({
                verifiedResult: {...this.state.verifiedResult, roomBedInfo: res},
                valueRatio: {...this.state.valueRatio, roomBedInfo: e.target.value}
            })
        } else if (this.state.currentStep === 5){
            this.setState({
                verifiedResult: {...this.state.verifiedResult, location: res},
                valueRatio: {...this.state.valueRatio, location: e.target.value}
            })
        }
    }

    onCancelClick(){
        this.setState({
            isOpenModal: false
        })
    }

    onConfirmedClick(){
        this.setState({
            isOpenModal: false
        })
        const updatedHome = {
            ...this.state.homepost,
            confirmedBy: this.props.auth.user.username,
            state: 'Success',
            note: JSON.stringify(this.state.noteResult)
        }

        //fetch
        this.props.fetchUpdateHomepost(updatedHome);
        message.success('Tin đăng đã được duyệt thành công');
    }

    onRejectedClick(){
        this.setState({
            isOpenModal: false
        })
        const updatedHome = {
            ...this.state.homepost,
            confirmedBy: this.props.auth.user.username,
            state: 'Rejected',
            note: JSON.stringify(this.state.noteResult)
        }

        //fetch
        this.props.fetchUpdateHomepost(updatedHome);
        message.success('Tin đăng đã được duyệt thành công');
    }

    // render content
    renderContent = () => {
        if (this.state.currentStep === 0){
            return(
                <div>
                    <h4><b>Mô tả</b></h4>
                    <Form>
                        <Form.Field>
                        <label>Tiêu đề</label>
                        <input value={this.state.homepost.name}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Mô tả</label>
                        <input value={this.state.homepost.description}/>
                        </Form.Field>
                    </Form>
                </div>
            )
        }
        else if (this.state.currentStep === 1){
            let lstImages = this.state.homepost.image.map(img => (
                <img src={baseUrl + img} />
            ))
            return(
                <div>
                    <h4><b>Hình ảnh</b></h4>
                    <Carousel autoplay >
                        {lstImages}
                    </Carousel>
                </div>
            )
        }
        else if (this.state.currentStep === 2){
            return(
                <div>
                    <h4><b>Thông tin cơ bản</b></h4>
                    <Form>
                        <Form.Field>
                        <label>Loại chỗ ở</label>
                        <input value={this.state.homepost.typeHome}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Loại phòng</label>
                        <input value={this.state.homepost.typeRoom}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Số khách tối đa</label>
                        <input value={this.state.homepost.maxPeoples}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Diện tích chỗ ở</label>
                        <input value={this.state.homepost.acreage}/>
                        </Form.Field>
                    </Form>
                </div>
            )
        }
        else if (this.state.currentStep === 3){
            return(
                <div>
                    <h4><b>Giá</b></h4>
                    <Form>
                        <Form.Field>
                        <label>Giá cơ bản</label>
                        <input value={this.state.homepost.weekdayPrice}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Giá cuối tuần</label>
                        <input value={this.state.homepost.weekendPrice}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Số đêm tối thiểu</label>
                        <input value={this.state.homepost.minimumNights}/>
                        </Form.Field>
                    </Form>
                </div>
            )
        }
        else if (this.state.currentStep === 4){
            return(
                <div>
                   <h4><b>Phòng và giường</b></h4>
                    <Form>
                        <Form.Field>
                        <label>Số phòng ngủ</label>
                        <input value={this.state.homepost.numBed}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Số giường</label>
                        <input value={this.state.homepost.numBedroom}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Số  phòng tắm</label>
                        <input value={this.state.homepost.numBathroom}/>
                        </Form.Field>
                    </Form>
                </div>
            )
        }
        else if (this.state.currentStep === 5){
            return(
                <div>
                    <h4><b>Vị trí</b></h4>
                    {this.state.homepost.location === null || !this.state.homepost.hasOwnProperty('location')
                        ? <div> Chưa được chủ nhà cung cấp </div> :
                        <Form>
                            <Form.Field>
                                <label>Tỉnh, thành phố</label>
                                <input value={this.state.homepost.location.province}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Quận, huyện</label>
                                <input value={this.state.homepost.location.district}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Phường, xã</label>
                                <input value={this.state.homepost.location.ward}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Số nhà, đường</label>
                                <input value={this.state.homepost.numHome}/>
                            </Form.Field>
                        </Form>
                    }
                </div>
            )
        }
    }

    onNextBtnClicked = () => {
        if (this.state.currentStep + 1 === 6){
            this.setState({
               isOpenModal: true
            })
        }
        else {
            this.setState({
                canNext: true,
                canBack: true,
                currentStep: this.state.currentStep + 1,
             })
        }
    }

    onBackBtnClicked = () =>{
        if (this.state.currentStep - 1 === 0){
            this.setState({
               currentStep: this.state.currentStep - 1,
               canBack: false,
               canNext: true,
            })
        }
        else{
            this.setState({
               currentStep: this.state.currentStep - 1,
               canBack: true,
               canNext: true,
            })
        }
    }

    render(){
        const columns = [{
            title: 'Trường thông tin',
            dataIndex: 'field',
            align: 'center',
            key: 'field',
            render: (text) => <b>{text}</b>
        }, {
            title: 'Phản hồi',
            dataIndex: 'response',
            key: 'response',
            align: 'center',
            render: (text) => (<Popover content={text}
                ><p>
                    {
                        text.length > 10 ?
                        text.substr(0,9) + '...':
                        text
                    }
                </p>
            </Popover>)
        }, {
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
            response: this.state.noteResult.description === '' ? 'Không có' : this.state.noteResult.description,
            states: [this.state.verifiedResult.description],
        },{
            key: 'field',
            field: 'Hình ảnh',
            response: this.state.noteResult.image === '' ? 'Không có' : this.state.noteResult.image,
            states: [this.state.verifiedResult.image],
        },{
            key: 'field',
            field: 'Thông tin cơ bản',
            response: this.state.noteResult.basicInfo === '' ? 'Không có' : this.state.noteResult.basicInfo,
            states: [this.state.verifiedResult.basicInfo],
        },{
            key: 'field',
            field: 'Giá',
            response: this.state.noteResult.price === '' ? 'Không có' : this.state.noteResult.price,
            states: [this.state.verifiedResult.price],
        },{
            key: 'field',
            field: 'Phòng và giường',
            response: this.state.noteResult.roomBedInfo === '' ? 'Không có' : this.state.noteResult.roomBedInfo,
            states: [this.state.verifiedResult.roomBedInfo],
        }, {
            key: 'field',
            field: 'Vị trí',
            response: this.state.noteResult.location === '' ? 'Không có' : this.state.noteResult.location,
            states: [this.state.verifiedResult.location],
        }];
        return(
            <div style = {{paddingTop: 30, paddingLeft: 50, paddingRight: 50,
                            paddingBottom: 50, background: '#f1f1f1'}}>
                <h2><b>Duyệt tin</b></h2>
                <Steps current={this.state.currentStep} style={{marginBottom: '10px'}}>
                    <Step title="Mô tả" />
                    <Step title="Hình ảnh" />
                    <Step title="Thông tin cơ bản" />
                    <Step title="Giá"/>
                    <Step title="Phòng và giường"/>
                    <Step title="Vị trí" />
                </Steps>
                <Row style={{paddingRight: '10px'}}>
                    <Col span={18} >
                        <Card style={{marginTop: '20px',
                                    boxShadow: "1px 3px 1px #9E9E9E",
                                    marginRight: '10px',
                                    height: '400px',
                                    overflowY: 'scroll'}}>
                            {this.renderContent()}
                        </Card>
                    </Col>
                    <Col span={6} onBackClickstyle={{marginTop: '10px'}}>
                        <span>
                            <Card style={{marginTop: '20px',
                                        textAlign:'center',
                                        boxShadow: "1px 3px 1px #9E9E9E",
                                        height: '100%',
                                        }} >
                                <h4><b>Phản hồi</b></h4>
                                <TextArea placeholder="Cung cấp phản hồi cho người dùng (nếu cần)"
                                        rows={4}
                                        onChange = {this.onNoteChange}
                                        value={
                                            this.state.currentStep === 0 ?
                                            this.state.noteResult.description :
                                            this.state.currentStep === 1 ?
                                            this.state.noteResult.image :
                                            this.state.currentStep === 2 ?
                                            this.state.noteResult.basicInfo :
                                            this.state.currentStep === 3 ?
                                            this.state.noteResult.price :
                                            this.state.currentStep === 4 ?
                                            this.state.noteResult.roomBedInfo :
                                            this.state.currentStep === 5 ?
                                            this.state.noteResult.location :
                                            ''
                                        }/>
                            </Card>
                            <Card style={{marginTop: '20px',
                                        textAlign:'center',
                                        boxShadow: "1px 3px 1px #9E9E9E",
                                        background: "#ffe4da"}} >
                            <h4><b>Xác nhận</b></h4>
                            <RadioGroup onChange={this.onChangeRatio}
                                        style = {{
                                            alignItems: 'center'
                                        }}
                                        value={
                                            this.state.currentStep === 0 ?
                                            this.state.valueRatio.description :
                                            this.state.currentStep === 1 ?
                                            this.state.valueRatio.image :
                                            this.state.currentStep === 2 ?
                                            this.state.valueRatio.basicInfo :
                                            this.state.currentStep === 3 ?
                                            this.state.valueRatio.price :
                                            this.state.currentStep === 4 ?
                                            this.state.valueRatio.roomBedInfo :
                                            this.state.currentStep === 5 ?
                                            this.state.valueRatio.location :
                                            ''
                                        }
                            >
                                <Radio value={1}>
                                    Hợp lệ
                                </Radio>
                                <Radio value={0}>Không hợp lệ</Radio>
                            </RadioGroup>
                            </Card>
                            <div align='center'>
                                <ButtonGroup style={{marginTop: '20px'}}>
                                    <Button type="primary" onClick={this.onBackBtnClicked}
                                            disabled={!this.state.canBack}>
                                        <Icon type="left" />Quay lại
                                    </Button>
                                    <Button type="primary" onClick={this.onNextBtnClicked}
                                            disabled={!this.state.canNext}>
                                        Tiếp theo <Icon type="right" />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </span>
                    </Col>
                </Row>
                <Modal
                    visible={this.state.isOpenModal}
                    title={<b>Xác nhận</b>}
                    onCancel={this.onCancelClick}
                    width='60%'
                    footer={[
                        <Button onClick={this.onConfirmedClick}
                                type='primary' ghost> Chấp nhận tin </Button>,
                        <Button type="danger" ghost onClick={this.onRejectedClick}> Từ chối tin </Button>,
                        <Button onClick={this.onCancelClick}> Hủy bỏ </Button>,
                    ]}
                    >
                    <Table columns={columns} dataSource={data}
                           pagination={{ pageSize: 5}} bordered/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))},
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyHomepostComponent);